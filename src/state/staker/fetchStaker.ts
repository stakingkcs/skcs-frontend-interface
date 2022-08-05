import VALIDATOR_ABI from 'constants/abi/Validators.json'
import { BigNumber } from 'ethers/utils'
import { StakerState } from 'state/types'
import { getStakerAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import { ZERO } from '../../constants/number'
import BN from 'bignumber.js'
import { updateStakerPublicDataByKey } from 'state/staker'
import state from 'state'

export const updateBannerData = async () => {
  const dispatch = state.dispatch

  const allStakerPropertyCalls = [
    {
      address: getStakerAddress(),
      name: 'accumulatedStakedKCSAmount',
    },
    {
      address: getStakerAddress(),
      name: 'getAccumulatedRewardKCSAmount',
    },
  ]

  const allStakerPropertyCallsRespond = await multicall(VALIDATOR_ABI, allStakerPropertyCalls)

  dispatch(
    updateStakerPublicDataByKey({ key: 'accumulatedStakedKCSAmount', value: allStakerPropertyCallsRespond[0][0] })
  )

  dispatch(updateStakerPublicDataByKey({ key: 'accumulatedReward', value: allStakerPropertyCallsRespond[1][0] }))
}

export const fetchStakerPublicData = async (): Promise<Partial<StakerState>> => {
  const allStakerPropertyCalls = [
    {
      address: getStakerAddress(),
      name: 'accumulatedStakedKCSAmount',
    },
    {
      address: getStakerAddress(),
      name: 'getAccumulatedRewardKCSAmount',
    },
    {
      address: getStakerAddress(),
      name: 'exchangeRate',
    },
    {
      address: getStakerAddress(),
      name: 'numberOfHolders',
    },
    {
      address: getStakerAddress(),
      name: 'protocolParams',
    },
  ]

  const allStakerPropertyCallsRespond = await multicall(VALIDATOR_ABI, allStakerPropertyCalls)

  console.log('allStakerPropertyCallsRespond', allStakerPropertyCallsRespond)

  const kcsQuetoBySKCS = new BN(allStakerPropertyCallsRespond[2][1].toString())
    .div(10 ** 18)
    .div(new BN(allStakerPropertyCallsRespond[2][0].toString(10)).div(10 ** 18))
    .toNumber()

  const skcsQuetoByKCS = new BN(allStakerPropertyCallsRespond[2][0].toString())
    .div(10 ** 18)
    .div(new BN(allStakerPropertyCallsRespond[2][1].toString()).div(10 ** 18))
    .toNumber()

  return {
    accumulatedStakedKCSAmount: allStakerPropertyCallsRespond[0][0],
    accumulatedReward: allStakerPropertyCallsRespond[1][0],
    totalStaker: allStakerPropertyCallsRespond[3][0],
    rewardFee: allStakerPropertyCallsRespond[4][0],
    totalStakeKCSAmount: allStakerPropertyCallsRespond[2][0],
    totalStakeSKCSAmount: allStakerPropertyCallsRespond[2][1],
    kcsQuetoBySKCS,
    skcsQuetoByKCS,
  }
}
