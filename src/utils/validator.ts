import { Contract } from '@ethersproject/contracts'
import { TransactionReceipt } from '@ethersproject/providers'
import { constants } from 'ethers'

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

export async function voteForValidator(
  validatorContract: Contract,
  targetValidatorAddress: string,
  amount: number
): Promise<ContractCallResponse> {
  try {
    const tx = await validatorContract.vote(targetValidatorAddress, { value: constants.WeiPerEther.mul(amount) })
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    return { status: 1, data: response }
  } catch (e) {
    console.error('contract call error', e)
    return { status: 0, error: e as ContractCallError }
  }
}

export async function redeemFromValidator(
  validatorContract: Contract,
  targetValidatorAddress: string,
  amount: number
): Promise<ContractCallResponse> {
  try {
    const tx = await validatorContract.revokeVote(targetValidatorAddress, amount)
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    return { status: 1, data: response }
  } catch (e) {
    console.error('contract call error', e)
    return { status: 0, error: e as ContractCallError }
  }
}

export async function withdrawFromValidator(
  validatorContract: Contract,
  targetValidatorAddress: string
): Promise<ContractCallResponse> {
  try {
    const tx = await validatorContract.withdraw(targetValidatorAddress)
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    return { status: 1, data: response }
  } catch (e) {
    console.error('contract call error', e)
    return { status: 0, error: e as ContractCallError }
  }
}

export async function claimRewardFromValidator(
  validatorContract: Contract,
  targetValidatorAddress: string
): Promise<ContractCallResponse> {
  try {
    const tx = await validatorContract.claimReward(targetValidatorAddress)
    const response: TransactionReceipt = await tx.wait(1)
    console.log('contract call response', response)
    return { status: 1, data: response }
  } catch (e) {
    console.error('contract call error', e)
    return { status: 0, error: e as ContractCallError }
  }
}

export const validatorContractHelper = {
  redeemFromValidator,
  voteForValidator,
  withdrawFromValidator,
  claimRewardFromValidator,
}
