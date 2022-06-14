import { ChainId } from 'mojitoswap-sdk'
import { Address } from '../constants/types'
import { MULTICALL_ADDRESS } from 'constants/multicall'
import contracts from 'constants/contract'

export const getAddress = (address: Address): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  return address[chainId as any] ?? address[ChainId.MAINNET]
}

export const getMulticallAddress = () => {
  return getAddress(MULTICALL_ADDRESS)
}

export const getValidatorAddress = () => {
  return getAddress(contracts.validator)
}
