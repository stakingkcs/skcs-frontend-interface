import VALIDATOR_ABI from 'constants/abi/Validators.json'
import { BigNumber } from 'ethers/utils'
import { StakerState } from 'state/types'
import { getStakerAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import { ZERO } from '../../constants/number'

export const fetchStakerPublicData = async (): Promise<Partial<StakerState>> => {
  const allStakerPropertyCalls = [
    {
      address: getStakerAddress(),
      name: 'accumulatedStakedKCSAmount',
    },
    {
      address: getStakerAddress(),
      name: 'accumulatedRewardKCSAmount',
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

  const kcsQuetoBySKCS = (allStakerPropertyCallsRespond[2][1] as BigNumber).div(allStakerPropertyCallsRespond[2][0])
  const skcsQuetoByKCS = (allStakerPropertyCallsRespond[2][0] as BigNumber).div(allStakerPropertyCallsRespond[2][1])

  return {
    accumulatedStakedKCSAmount: allStakerPropertyCallsRespond[0],
    accumulatedReward: allStakerPropertyCallsRespond[1],
    totalStaker: allStakerPropertyCallsRespond[3],
    rewardFee: allStakerPropertyCalls[4][0],
    totalStakeKCSAmount: allStakerPropertyCallsRespond[2][0],
    totalStakeSKCSAmount: allStakerPropertyCallsRespond[2][1],
    kcsQuetoBySKCS,
    skcsQuetoByKCS,
    apr: ZERO,
  }
}
