import { Contract } from '@ethersproject/contracts'
import { TransactionReceipt } from '@ethersproject/providers'
import BN from 'bignumber.js'
import { BigNumber } from 'ethers/utils'

interface ContractCallError {
  code: number
  message: string
  stack: string
}

interface ContractCallResponse {
  status: number
  data?: TransactionReceipt
  error?: ContractCallError
}

export async function depositKCSToValidator(
  stakerContract: Contract,
  amount: BigNumber | BN,
  account: string
): Promise<ContractCallResponse> {
  try {
    console.log('___', amount.toString())
    const tx = await stakerContract.depositKCS(account, { value: new BN(amount.toString(10)).toString(10) })
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    return { status: 1, data: response }
  } catch (e) {
    console.error('contract call error', e)
    return { status: 0, error: e as ContractCallError }
  }
}

export async function requestRedemption(
  stakerContract: Contract,
  amount: BN,
  account: string
): Promise<ContractCallResponse> {
  try {
    const tx = await stakerContract.requestRedemption(amount.toString(10), account)
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    return { status: 1, data: response }
  } catch (e) {
    console.error('contract call error', e)
    return { status: 0, error: e as ContractCallError }
  }
}

export async function withdrawKCSFromValidator(
  stakerContract: Contract,
  account: string
): Promise<ContractCallResponse> {
  try {
    const tx = await stakerContract.withdrawKCS(account, account)
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    return { status: 1, data: response }
  } catch (e) {
    console.error('contract call error', e)
    return { status: 0, error: e as ContractCallError }
  }
}

export const stakerContractHelper = {
  depositKCSToValidator,
  requestRedemption,
  withdrawKCSFromValidator,
}
