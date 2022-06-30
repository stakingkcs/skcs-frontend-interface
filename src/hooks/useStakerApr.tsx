import { JsonRpcProvider } from '@ethersproject/providers'
import ABI from 'constants/abi/Validators.json'
import { ZERO } from 'constants/number'
import { Zero } from 'ethers/constants'
import { BigNumber } from 'ethers/utils'
import { useBlockNumber } from 'state/application/hooks'
import { useStakerState } from 'state/hooks'
import { updateStakerPublicDataByKey } from 'state/staker'
import { getContract } from 'utils'
import { getStakerAddress } from 'utils/addressHelpers'
import { useAppDispatch } from '../state/index'
import BN from 'bignumber.js'

export const useStakeApr = async () => {
  const staker = useStakerState()
  const dispatch = useAppDispatch()

  const latestBlock = useBlockNumber()

  if (!latestBlock || staker.skcsQuetoByKCS == 0 || !latestBlock) {
    dispatch(updateStakerPublicDataByKey({ key: 'apr', value: 0 }))
    return null
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

    console.log('yesterdayBlock', yesterdayBlock)

    const response = await contract.functions.exchangeRate({ blockTag: yesterdayBlock })

    console.log('response', response)

    if (response[0]) {
      const preSkcsQuetoByKCS = new BN(response[0].toString())
        .div(10 ** 18)
        .div(new BN(response[1].toString()).div(10 ** 18))
        .toString()

      console.log('preSkcsQuetoByKCS', preSkcsQuetoByKCS)

      const apr = (staker.skcsQuetoByKCS - Number(preSkcsQuetoByKCS)) * 180
      dispatch(updateStakerPublicDataByKey({ key: 'apr', value: apr }))
    }
  } catch (e) {
    console.log(e)
  }
  return null
}
