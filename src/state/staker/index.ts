import { createSlice } from '@reduxjs/toolkit'
import { getContract } from '../../utils/index'
import { StakerState } from '../types'
import { getStakerAddress } from '../../utils/addressHelpers'
import VALIDATOR_ABI from 'constants/abi/Validators.json'
import { ZERO } from 'constants/number'
import multicall from 'utils/multicall'
import { fetchStakerPublicData } from './fetchStaker'

const initialState: StakerState = {
  accumulatedStakedKCSAmount: ZERO,
  accumulatedReward: ZERO,
  totalStakeKCSAmount: ZERO,
  totalStakeSKCSAmount: ZERO,
  totalStaker: ZERO,
  rewardFee: ZERO,
  apr: ZERO,
  kcsQuetoBySKCS: ZERO,
  skcsQuetoByKCS: ZERO,
  updatedAt: new Date().getTime(),
  userData: {
    stakeAmount: ZERO,
    pendingAmount: ZERO,
    availabelWithdrawAmount: ZERO,
  },
}

export const StakerSlice = createSlice({
  name: 'Staker',
  initialState,
  reducers: {
    setStakerPublicData: (state, action) => {
      const staterData: StakerState = action.payload.staker
      state = staterData
      state.updatedAt = new Date().getTime()
    },
    setStakerPublicDataByKey: (state, action) => {
      const { key, value } = action.payload
      state[key] = value
    },
    updateStakerUserData: (state, action: { payload: StakerState['userData'] }) => {
      const userData = action.payload
      state.userData = userData
    },
    updateStakerUserDataByKey: (state, action) => {
      const { key, value } = action.payload
      state.userData[key] = value
    },
  },
})

// Actions
export const { setStakerPublicData, setStakerPublicDataByKey, updateStakerUserData, updateStakerUserDataByKey } =
  StakerSlice.actions

// Thunks

export const fetchStakersUserDataAsync = (account) => async (dispatch) => {
  const allStakerUserDataCalls = [
    {
      address: getStakerAddress(),
      name: 'withdrawable',
      params: [account],
    },
    {
      address: getStakerAddress(),
      name: 'notWithdrawable',
      params: [account],
    },
    {
      address: getStakerAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const allUserDataCallsRespond = await multicall(VALIDATOR_ABI, allStakerUserDataCalls)

  console.log('allUserDataCallsRespond', allUserDataCallsRespond)

  dispatch(
    updateStakerUserData({
      availabelWithdrawAmount: allUserDataCallsRespond[0][0],
      pendingAmount: allUserDataCallsRespond[1][0],
      stakeAmount: allUserDataCallsRespond[2][0],
    })
  )
}

export const fetchStakerPublicDataAsync = (account?: string) => async (dispatch) => {
  const stakerData = await fetchStakerPublicData()
  dispatch(setStakerPublicData({ staker: stakerData }))
  if (account) {
    dispatch(fetchStakersUserDataAsync(account))
  }
}

export default StakerSlice.reducer
