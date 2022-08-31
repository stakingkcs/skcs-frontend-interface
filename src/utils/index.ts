import { networks, NetworkType } from '../constants/networks'
import BN from 'bignumber.js'
import web3 from 'web3'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

import { WalletList } from '../constants/wallet'
import { Contract } from '@ethersproject/contracts'
import { AddressZero } from 'ethers/constants'
import { getAddress } from 'ethers/utils'

const { utils } = new web3()

export const web3Utils = utils

export function getNetworkInfo(networkId: any): NetworkType {
  return networks[networkId]
}

export function getWalletInfo(walletId: number) {
  for (let i = 0; i < WalletList.length; i++) {
    if (WalletList[i].id === walletId) {
      return WalletList[i]
    }
  }
}

// export async function getApproveStatus(account: string, tokenAddress: string, bridgeAddress: string, library: any) {
//   const tokenContract = getErc20Contract(tokenAddress, library)
//   const allowance = await tokenContract.methods.allowance(account, bridgeAddress).call()
//   return allowance ?? 0
// }


/**
 * getDecimals
 */
export function getDecimals(amount: string) {
  if (!amount.includes('.')) {
    return 0
  } else {
    const [, decimal] = amount.split('.')
    return decimal.length ?? 0
  }
}


export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

/**
 * Given APR returns APY
 * @param apr APR as percentage
 * @param compoundFrequency how many compounds per day
 * @param days if other than 365 adjusts (A)PY for period less than a year
 * @param performanceFee performance fee as percentage
 * @returns APY as decimal
 */

export const getApy = (apr: number, compoundFrequency = 1, days = 365, performanceFee = 0) => {
  const daysAsDecimalOfYear = days / 365
  const aprAsDecimal = apr / 100
  const timesCompounded = 365 * compoundFrequency
  let apyAsDecimal = (apr / 100) * daysAsDecimalOfYear
  if (timesCompounded > 0) {
    apyAsDecimal = (1 + aprAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear) - 1
  }
  if (performanceFee) {
    const performanceFeeAsDecimal = performanceFee / 100
    const takenAsPerformanceFee = apyAsDecimal * performanceFeeAsDecimal
    apyAsDecimal -= takenAsPerformanceFee
  }
  return apyAsDecimal
}

