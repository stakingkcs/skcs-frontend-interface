import { Contract } from '@ethersproject/contracts'
import { TransactionReceipt } from '@ethersproject/providers'
import BN from 'bignumber.js'
import { BigNumber } from 'ethers/utils'
import { BigNumber as B } from '@ethersproject/bignumber'

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

function marginGasLimit(gasLimit: B) {
  return gasLimit.mul(3)
}

export async function depositKCSToValidator(
  stakerContract: Contract,
  amount: BigNumber | BN,
  account: string
): Promise<ContractCallResponse> {
  try {
    const gasLimit = await stakerContract.estimateGas.depositKCS(account, {
      value: new BN(amount.toString(10)).toString(10),
    })
    console.log('depositKCS gasLimit', gasLimit)
    const tx = await stakerContract.depositKCS(account, {
      value: new BN(amount.toString(10)).toString(10),
      gasLimit: marginGasLimit(gasLimit),
    })
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    if (window.gtag) {
      window.gtag('event', 'stake')
    }
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
    const gasLimit = await stakerContract.estimateGas.requestRedemption(amount.toString(10), account)

    console.log('requestRedemption gasLimit', gasLimit)

    const tx = await stakerContract.requestRedemption(amount.toString(10), account, {
      gasLimit: marginGasLimit(gasLimit),
    })
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    if (window.gtag) {
      window.gtag('event', 'unstake')
    }
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
    const gasLimit = await stakerContract.estimateGas.withdrawKCS(account, account)

    console.log('withdrawKCS gasLimit', gasLimit)

    const tx = await stakerContract.withdrawKCS(account, account, { gasLimit: marginGasLimit(gasLimit) })
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
