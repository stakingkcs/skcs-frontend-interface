import dayjs from 'dayjs'
import 'dayjs/locale/en.js'
import 'dayjs/locale/fr.js'
import 'dayjs/locale/ja.js'
import 'dayjs/locale/nl.js'
import 'dayjs/locale/tr.js'
import 'dayjs/locale/zh-tw.js'
import Marquee from 'react-fast-marquee'
import { useInterval } from 'hooks/useInterval'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { calculateCountdown } from 'utils/datecountdown'
import { ActivityType } from '.'
import { RowCenterBox } from '../../components/index'
import { useLanguage } from '../../state/application/hooks'
import { formatNumber } from '../../utils/bignumber'
import { Image } from 'components'
import { Carousel } from 'antd'
import { useResponsive } from '../../utils/responsive'

const addLeadingZeros = (value: any) => {
  let value1 = String(value)
  if (value < 10) {
    value1 = `0${value}`
  }
  return value1
}

const bg = require('../../assets/images/skcswin/skcs-win-bg.png').default

const Wrap = styled.div`
  width: 100%;
  height: 400px;
  background: url(${bg}) bottom right no-repeat, #050c26;
  background-size: auto 100%;
`

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 104px;
  padding-bottom: 34px;
`

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 454px;
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  text-align: center;
  background: linear-gradient(93.69deg, #41e6af 0.42%, #b65cf1 82.72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  font-family: 'Hiragino Kaku Gothic StdN';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 54px;
  padding: 0;
`

const borderBg = require('../../assets/images/skcswin/border.png').default

const TimeWrap = styled.div`
  background: url(${borderBg}) top center no-repeat;
  background-size: 100% 100%;
  width: 249px;
  height: 32px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const TimeContent = styled.div`
  background: linear-gradient(89.94deg, #44e3b1 1.83%, #b65cf1 105.04%);
  border-radius: 16px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  background-size: 100% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

const CutdownTitle = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: #ffffff;
  margin-top: 24px;
`

const timeBorderBg = require('../../assets/images/skcswin/cutdown-bg.png').default

const TimeItem = styled.div`
  width: 52px;
  height: 60px;
  border-radius: 8px;
  background: url(${timeBorderBg}) top center no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
`

const TimeNumber = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  color: #ffffff;
`

const TimeText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #ffffff;
  position: relative;
  bottom: -7px;
`

const TimeSpeator = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin: 0 12px;
`

const endBg = require('../../assets/images/skcswin/end-bg.png').default

const EndButton = styled.div`
  background: url(${endBg}) top center no-repeat;
  width: 300px;
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-top: 25px;
`

const ImageWrap = styled.div`
  margin: 5px 24px;
`

const carouselBg = require('../../assets/images/skcswin/carousel-bg.png').default

const Crousel = styled.div`
  width: 100%;
  height: 32px;
  background: url(${carouselBg}) top center no-repeat;
  background-size: 100% 100%;
`

const Banner: React.FunctionComponent<{ activity: ActivityType }> = ({ activity }) => {
  const { t } = useTranslation()
  const lan = useLanguage()
  const { isMobile } = useResponsive()

  const [isEnd, setIsEnd] = React.useState<boolean>(false)

  const [time, setTime] = React.useState({
    years: 0,
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  })

  const translateTable = {
    en: 'en',
    zh_TW: 'zh-tw',
    de_DE: 'de',
    fr_FR: 'fr',
    ja_JP: 'ja',
    tr_TR: 'tr',
    nl_NL: 'nl',
  }

  const startTime = React.useMemo(() => {
    dayjs.locale(translateTable[lan])
    return dayjs(activity.startTime).format('hh:mm MMM D')
  }, [lan, activity, t])

  const endTime = React.useMemo(() => {
    return dayjs(activity.endTime).format('hh:mm MMM D,YYYY')
  }, [lan, activity, t])

  useInterval(() => {
    if (isEnd) {
      return false
    }
    const time1 = calculateCountdown(activity.endTime)
    console.log('time1', time1)
    if (time1) {
      setTime(() => time1)
    } else {
      setIsEnd(() => true)
    }
  }, 1000)

  return (
    <>
      <Wrap>
        <BannerContent>
          <Content>
            <Title>{t(activity.title, { poolPrize: formatNumber(2000, 0, 3) })}</Title>
            <TimeWrap>
              <TimeContent>{`${startTime} ~ ${endTime}`}</TimeContent>
            </TimeWrap>
            {isEnd ? (
              <EndButton>{t('sKCSWin.EndButtonText')}</EndButton>
            ) : (
              <>
                {' '}
                <CutdownTitle>{t('sKCSWin.CutdownTitle')}</CutdownTitle>
                <RowCenterBox style={{ marginTop: '16px' }} justify="center">
                  <TimeItem>
                    <TimeNumber>{addLeadingZeros(time.days)}</TimeNumber>
                    <TimeText>{t('sKCSWin.D')}</TimeText>
                  </TimeItem>
                  <TimeSpeator>:</TimeSpeator>
                  <TimeItem>
                    <TimeNumber>{addLeadingZeros(time.hours)}</TimeNumber>
                    <TimeText>{t('sKCSWin.H')}</TimeText>
                  </TimeItem>
                  <TimeSpeator>:</TimeSpeator>
                  <TimeItem>
                    <TimeNumber>{addLeadingZeros(time.min)}</TimeNumber>
                    <TimeText>{t('sKCSWin.M')}</TimeText>
                  </TimeItem>
                  <TimeSpeator>:</TimeSpeator>
                  <TimeItem>
                    <TimeNumber>{addLeadingZeros(time.sec)}</TimeNumber>
                    <TimeText>{t('sKCSWin.S')}</TimeText>
                  </TimeItem>
                </RowCenterBox>
              </>
            )}
          </Content>
        </BannerContent>
      </Wrap>
      <Crousel>
        <Marquee direction="right" speed={50} gradientWidth={0}>
          <RowCenterBox style={{ width: '100%' }}>
            {new Array(isMobile ? 4 : 12).fill(0).map((n, index) => {
              return (
                <ImageWrap key={index}>
                  <Image
                    src={require('../../assets/images/skcswin/stake-to-earn.png').default}
                    width="151px"
                    height="auto"
                    alt="logo"
                  />
                </ImageWrap>
              )
            })}
          </RowCenterBox>
        </Marquee>
      </Crousel>
    </>
  )
}

export default Banner
