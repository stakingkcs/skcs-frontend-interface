import BN from 'bignumber.js'
import { ZERO } from 'constants/number'
import { getAccRewardPerShareByBlock } from 'graph'
import store from 'state'
import { useBlockNumber } from 'state/application/hooks'
import { useStakerState } from 'state/hooks'
import { useAppDispatch } from '../state/index'

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

  if (!latestBlock || staker.skcsQuetoByKCS.eq(ZERO)) {
    return 0
  }

  try { 

    const yesterdayBlock = latestBlock - Math.floor((48 * 60 * 60) / 3)
    const yesterdayPerShareList = await getAccRewardPerShareByBlock(yesterdayBlock)
    console.log('yesterdayPerShareList', yesterdayPerShareList)
  } catch (e) {
    console.log(e)
  }
}
