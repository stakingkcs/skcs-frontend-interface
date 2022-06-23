import BN from 'bignumber.js'
import { ZERO } from 'constants/number'
import { getAccRewardPerShareByBlock } from 'graph'
import store from 'state'
import { useBlockNumber } from 'state/application/hooks'
import { useStakerState } from 'state/hooks'
import { getContract } from 'utils'
import { getAddress, getStakerAddress } from 'utils/addressHelpers'
import { useAppDispatch } from '../state/index'
import ABI from 'constants/abi/Validators.json'
import { JsonRpcProvider } from '@ethersproject/providers'
import { BigNumber } from 'ethers/utils'
import { updateStakerPublicDataByKey, updateStakerUserData } from 'state/staker'
import { Zero } from 'ethers/constants'

interface AccPerShareEntities {
  accRewardPerShare: string
  block: string
  validator: string
}

export const getValidatorApr = (validatorPerShare: BN) => {
  return new BN(
    new BN(validatorPerShare).div(1e12).div(1e18).multipliedBy(365).multipliedBy(100).toFixed(2, 1)
  ).toString()
}

export const useStakeApr = async () => {
  const dispatch = useAppDispatch()

  const latestBlock = useBlockNumber()
  const staker = useStakerState()

  if (!latestBlock || staker.skcsQuetoByKCS.eq(ZERO) || !latestBlock) {
    dispatch(updateStakerPublicDataByKey({ key: 'apr', value: Zero }))
    return
  }

  try {
    const yesterdayBlock = Number(latestBlock) - Math.floor((48 * 60 * 60) / 3)

    const contract = getContract(
      getStakerAddress(),
      ABI,
      new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL, {
        name: 'kcc',
        chainId: Number(process.env.REACT_APP_CHAIN_ID),
      }) as any
    )

    const response = await contract.functions.exchangeRate({ blockTag: yesterdayBlock })

    const preSkcsQuetoByKCS = (response[0][0] as BigNumber).div(response[0][1])

    const apr = staker.skcsQuetoByKCS.sub(preSkcsQuetoByKCS).mul(180)

    dispatch(updateStakerPublicDataByKey({ key: 'apr', value: apr }))
  } catch (e) {
    console.log(e)
  }
}
