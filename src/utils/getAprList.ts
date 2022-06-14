import BN from 'bignumber.js'
import { getAccRewardPerShareByBlock, getLatestAccRewardPerShare } from 'graph'
import { find } from 'lodash'
import store from 'state'
import { updateAprList } from '../state/application/actions'

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

export const getPoolAprList = async () => {
  const dispatch = store.dispatch

  try {
    const newPerShareList = await getLatestAccRewardPerShare()
    const { accPerShareEntities }: { accPerShareEntities: AccPerShareEntities[] } = newPerShareList

    console.log('accPerShareEntities', accPerShareEntities)

    if (newPerShareList?.accPerShareEntities && accPerShareEntities.length) {
      const latestBlock = accPerShareEntities.reduce((prev, current) => {
        return Number(current.block) > prev ? Number(current.block) : prev
      }, 0)

      console.log('latestBlock', latestBlock)

      const yesterdayBlock = latestBlock - Math.floor((24 * 60 * 60) / 3)

      const yesterdayPerShareList = await getAccRewardPerShareByBlock(yesterdayBlock)

      console.log('yesterdayPerShareList', yesterdayPerShareList)

      const yesterdayAccPerShareEntities = yesterdayPerShareList?.accPerShareEntities as AccPerShareEntities[]

      if (yesterdayAccPerShareEntities?.length) {
        let aprList: { [key: string]: string } = {}
        yesterdayAccPerShareEntities.map((validator) => {
          const target = find(accPerShareEntities, { validator: validator.validator.toLowerCase() })
          if (target) {
            const sharesDiff = new BN(target.accRewardPerShare).minus(validator.accRewardPerShare)
            const apr = getValidatorApr(sharesDiff)
            aprList[validator.validator.toLowerCase()] = apr
          }
        })

        dispatch(updateAprList(aprList))
      }
    }
  } catch (e) {
    console.log(e)
  }
}
