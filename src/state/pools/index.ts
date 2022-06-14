/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import pools from 'constants/pools'

import { fetchPoolAllInfo } from './fetchPools'
import { Pool, PoolsState } from '../types'
import { getContract } from '../../utils/index'
import { getValidatorAddress } from '../../utils/addressHelpers'
import VALIDATOR_ABI from 'constants/abi/Validators.json'
import { JsonRpcProvider } from '@ethersproject/providers'

const initialState: PoolsState = { data: pools, updatedAt: new Date().getTime() }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload.pools
      state.data = livePoolsData
      state.updatedAt = new Date().getTime()
    },
    updatePoolsUserData: (state, action) => {
      const { userData, poolAddress } = action.payload
      const index = state.data.findIndex((p) => p.address?.toLowerCase() === poolAddress?.toLowerCase())
      state.data[index] = {
        ...state.data[index],
        userData: { ...userData },
      }
    },
  },
})

// Actions
export const { setPoolsPublicData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = (account?: string) => async (dispatch) => {
  const allPoolsWithData = await fetchPoolAllInfo()
  dispatch(setPoolsPublicData({ pools: allPoolsWithData }))
  if (account) {
    dispatch(fetchPoolsUserDataAsync(account))
  }
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const validatorContract = getContract(
    getValidatorAddress(),
    VALIDATOR_ABI,
    new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL) as any,
    account
  )

  const userVotingSummary = await validatorContract?.functions.getUserVotingSummary(account)

  // console.log('getUserVotingSummary', userVotingSummary)

  const userPoolList = userVotingSummary?.votingDataList

  for (let i = 0; i < userPoolList?.length; i++) {
    const pool = userPoolList[i]
    dispatch(
      updatePoolsUserData({
        poolAddress: pool.validator,
        userData: {
          ballot: pool.ballot,
          feeShares: pool.feeShares,
          pendingReward: pool.pendingReward,
          revokeLockingEndTime: pool.revokeLockingEndTime,
          revokingBallot: pool.revokingBallot,
          validatorBallot: pool.validatorBallot,
        },
      })
    )
  }
}

export default PoolsSlice.reducer
