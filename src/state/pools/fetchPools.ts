import { JsonRpcProvider } from '@ethersproject/providers'
import VALIDATOR_ABI from 'constants/abi/Validators.json'
import pools from 'constants/pools'
import { getContract } from 'utils'
import { getValidatorAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import { PoolConfig, ValidatorStatus } from '../../constants/types'

export const fetchPoolBasicInfo = async (poolsInfo: PoolConfig[]) => {
  // basic info
  // const allPoolCalls = poolsInfo.map((pool) => {
  //   return {
  //     address: getValidatorAddress(),
  //     name: 'candidateInfos',
  //     params: [pool.address],
  //   }
  // })

  // console.log('allPoolCalls', allPoolCalls)

  // const allPoolCallsRespond = await multicall(VALIDATOR_ABI, allPoolCalls)

  // console.log('allPoolCallsRespond', allPoolCallsRespond)

  // all selbllotscalls
  // const getPoolSelfBallotsCalls = poolsInfo.map((pool) => {
  //   return {
  //     address: getValidatorAddress(),
  //     name: 'getPoolSelfBallots',
  //     params: [pool.address],
  //   }
  // })

  // const getPoolSelfBallotsCallsResponse = await multicall(VALIDATOR_ABI, getPoolSelfBallotsCalls)
  // console.log('getPoolSelfBallotsCallsResponse', getPoolSelfBallotsCallsResponse)

  // getPoolsuppliedBallotCalls
  const getPoolsuppliedBallotCalls = poolsInfo.map((pool) => {
    return {
      address: getValidatorAddress(),
      name: 'getPoolsuppliedBallot',
      params: [pool.address],
    }
  })

  const getPoolsuppliedBallotCallsResponse = await multicall(VALIDATOR_ABI, getPoolsuppliedBallotCalls)
  // console.log('getPoolsuppliedBallotCallsResponse', getPoolsuppliedBallotCallsResponse)

  // getPoolfeeShares
  const getPoolfeeSharesCalls = poolsInfo.map((pool) => {
    return {
      address: getValidatorAddress(),
      name: 'getPoolfeeShares',
      params: [pool.address],
    }
  })

  const getPoolfeeSharesCallsRespond = await multicall(VALIDATOR_ABI, getPoolfeeSharesCalls)
  // console.log('getPoolfeeSharesCallsRespond', getPoolfeeSharesCallsRespond)

  // set pool status

  const getPoolEnabled = poolsInfo.map((pool) => {
    return {
      address: getValidatorAddress(),
      name: 'getPoolenabled',
      params: [pool.address],
    }
  })

  // all validtors status

  const getPoolEnabledResponse = await multicall(VALIDATOR_ABI, getPoolEnabled)
  console.log('getPoolEnabledResponse', getPoolEnabledResponse)

  const validatorContract = getContract(
    getValidatorAddress(),
    VALIDATOR_ABI,
    new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL, {
      chainId: Number(process.env.REACT_APP_CHAIN_ID),
      name: 'kcc',
    }) as any
  )

  // active validator
  const activeValidtors = (((await validatorContract.getActiveValidators()) as string[]) ?? []).map((address) =>
    address.toLowerCase()
  )
  console.log('activeValidtors', activeValidtors)

  // find jailed pool list， in config pools not in topValidator

  const jailedPoolList = pools.map((p, index) => {
    if (getPoolEnabledResponse[index][0] === false) {
      return p.address.toLowerCase()
    }
  })

  const getAcitveOrInactiveStatus = (poolAddress: string): ValidatorStatus => {
    if (activeValidtors.includes(poolAddress.toLowerCase())) {
      return ValidatorStatus.Active
    }
    return ValidatorStatus.Inactive
  }

  const getPoolStatus = (poolAddress: string): ValidatorStatus => {
    if (jailedPoolList.includes(poolAddress.toLowerCase())) {
      return ValidatorStatus['In Jail']
    }
    return getAcitveOrInactiveStatus(poolAddress)
  }

  return [
    ...pools.map((p, index) => ({
      address: p.address,
      name: p.name,
      website: p.website,
      email: p.email,
      details: p.details,
      status: getPoolStatus(p.address),
      feeShares: getPoolfeeSharesCallsRespond[index][0],
      votes: getPoolsuppliedBallotCallsResponse[index][0],
      userData: {},
    })),
  ]
}

export const fetchPoolAllInfo = async () => {
  return await fetchPoolBasicInfo(pools)
}
