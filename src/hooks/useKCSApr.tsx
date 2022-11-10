import { useStakerState } from 'state/hooks'
import { useAppDispatch } from '../state/index'
import axios from 'axios'
import { updateStakerPublicDataByKey } from 'state/staker'

export const useKCSApr = async () => {
  const staker = useStakerState()
  const dispatch = useAppDispatch()

  if (staker.kcsBonusApy) return

  try {
    const response = await axios.get('https://campain.skcs.io/api/v1/info/bonus/sevenDayRate')
    if (response.data.code === 0) {
      dispatch(updateStakerPublicDataByKey({ key: 'kcsBonusApy', value: response.data.data.sevenDayRate / 100 }))
    }
  } catch (e) {
    console.log(e)
  }
}
