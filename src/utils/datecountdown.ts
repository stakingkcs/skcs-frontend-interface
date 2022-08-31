import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function calculateCountdown(endDate: string) {
  let diff = dayjs('2022/09/08 18:00:00').utc().unix() - dayjs(new Date().getTime()).utc().unix()

  // clear countdown when date is reached
  if (diff <= 0) return false

  const timeLeft = {
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  }

  // calculate time difference between now and expected date
  if (diff >= 365.25 * 86400) {
    // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400))
    diff -= timeLeft.years * 365.25 * 86400
  }
  if (diff >= 86400) {
    // 24 * 60 * 60
    timeLeft.days = Math.floor(diff / 86400)
    diff -= timeLeft.days * 86400
  }
  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600)
    diff -= timeLeft.hours * 3600
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60)
    diff -= timeLeft.min * 60
  }
  timeLeft.sec = diff

  return timeLeft
}
