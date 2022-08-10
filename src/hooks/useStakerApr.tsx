import { JsonRpcProvider } from '@ethersproject/providers'
import BN from 'bignumber.js'
import ABI from 'constants/abi/Validators.json'
import { useBlockNumber } from 'state/application/hooks'
import { useStakerState } from 'state/hooks'
import { updateStakerPublicDataByKey } from 'state/staker'
import { getContract } from 'utils'
import { getStakerAddress } from 'utils/addressHelpers'
import { useAppDispatch } from '../state/index'
import { useWeb3React } from '@web3-react/core'

let hasApr = false

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

export const useStakeApr = async () => {
  const staker = useStakerState()
  const dispatch = useAppDispatch()

  const provider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL)

  const latestBlock = await provider.getBlockNumber()
  console.log('latestBlock', latestBlock)

  if (hasApr) {
    return
  }

  if (!latestBlock || staker.skcsQuetoByKCS == 0 || !latestBlock) {
    dispatch(updateStakerPublicDataByKey({ key: 'apr', value: 0 }))
    return null
  }

  try {
    const yesterdayBlock = Number(latestBlock) - Math.floor((24 * 60 * 60) / 3)
    console.log('yesterdayBlock', yesterdayBlock)

    const contract = getContract(
      getStakerAddress(),
      ABI,
      new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL, {
        name: 'kcc',
        chainId: Number(process.env.REACT_APP_CHAIN_ID),
      }) as any
    )

    const deployBlock = parseInt(process.env.REACT_APP_DEPOLY_BLOCK as string)

    // check blocknumber
    if (yesterdayBlock < deployBlock) {
      dispatch(updateStakerPublicDataByKey({ key: 'apr', value: 0 }))
      return
    }

    const response = await contract.functions.exchangeRate({ blockTag: yesterdayBlock })

    console.log('response', response)

    if (response[0]) {
      const preSkcsQuetoByKCS = new BN(response[0].toString())
        .div(10 ** 18)
        .div(new BN(response[1].toString()).div(10 ** 18))
        .toString()

      console.log('preSkcsQuetoByKCS', preSkcsQuetoByKCS)

      const apr = ((staker.skcsQuetoByKCS - Number(preSkcsQuetoByKCS)) / Number(preSkcsQuetoByKCS)) * 365
      const apy = getApy(apr * 100)

      console.log('apy', apy)

      dispatch(updateStakerPublicDataByKey({ key: 'apr', value: apy }))

      hasApr = true
    }
  } catch (e) {
    console.log(e)
  }
  return null
}
