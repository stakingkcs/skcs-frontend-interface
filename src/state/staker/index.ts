import { createSlice } from '@reduxjs/toolkit'
import { getContract } from '../../utils/index'
import { StakerState } from '../types'
import { getStakerAddress } from '../../utils/addressHelpers'
import VALIDATOR_ABI from 'constants/abi/Validators.json'
import { ZERO } from 'constants/number'
import multicall from 'utils/multicall'
import { fetchStakerPublicData } from './fetchStaker'
import { JsonRpcProvider } from '@ethersproject/providers'

const initialState: StakerState = {
  accumulatedStakedKCSAmount: ZERO,
  accumulatedReward: ZERO,
  totalStakeKCSAmount: ZERO,
  totalStakeSKCSAmount: ZERO,
  totalStaker: ZERO,
  rewardFee: ZERO,
  apr: 0,
  kcsBonusApy:0,
  kcsQuetoBySKCS: 0,
  skcsQuetoByKCS: 0,
  updatedAt: new Date().getTime(),
  userData: {
    stakeAmount: ZERO,
    pendingAmount: ZERO,
    availableWithdrawKCSAmount: ZERO,
    availableBurnSKCSAmount: ZERO,
  },
}

export const StakerSlice = createSlice({
  name: 'Staker',
  initialState,
  reducers: {
    setStakerPublicData: (state, action: { payload: { staker } }) => {
      const { staker } = action.payload
      state.accumulatedReward = staker.accumulatedReward
      state.accumulatedStakedKCSAmount = staker.accumulatedStakedKCSAmount
      state.totalStakeKCSAmount = staker.totalStakeKCSAmount
      state.totalStakeSKCSAmount = staker.totalStakeSKCSAmount
      state.kcsQuetoBySKCS = staker.kcsQuetoBySKCS
      state.skcsQuetoByKCS = staker.skcsQuetoByKCS
      state.totalStaker = staker.totalStaker
      state.rewardFee = staker.rewardFee
      state.updatedAt = new Date().getTime()
    },
    updateStakerPublicDataByKey: (state, action: { payload: { key: keyof StakerState, value: any } }) => {
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
export const { setStakerPublicData, updateStakerPublicDataByKey, updateStakerUserData, updateStakerUserDataByKey } =
  StakerSlice.actions

// Thunks

export const fetchStakersUserDataAsync = (account) => async (dispatch) => {
  const contract = getContract(
    getStakerAddress(),
    VALIDATOR_ABI,
    new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL, {
      name: 'kcc',
      chainId: Number(process.env.REACT_APP_CHAIN_ID),
    }) as any,
    account
  )

  const pendingAmount = await contract.functions.notWithdrawable(account)
  const availableWithdrawKCSAmount = await contract.functions.withdrawable(account)

  const allStakerUserDataCalls = [
    {
      address: getStakerAddress(),
      name: 'balanceOf',
      params: [account],
    },
  ]

  const allUserDataCallsRespond = await multicall(VALIDATOR_ABI, allStakerUserDataCalls)

  console.log('pendingAmount', pendingAmount)

  dispatch(
    updateStakerUserData({
      availableWithdrawKCSAmount: availableWithdrawKCSAmount[0],
      availableBurnSKCSAmount: pendingAmount[1],
      pendingAmount: pendingAmount[0],
      stakeAmount: allUserDataCallsRespond[0][0],
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
