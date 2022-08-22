import { useWeb3React } from '@web3-react/core'
import { Image } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import SKCSWinTitle from './components/SKCSTitle'
import { ActivityType } from './index'
import { formatNumber } from '../../utils/bignumber'

const ParticipateWrap = styled.div`
  position: relative;
  width: 584px;
`

const DecorateImage = styled.div`
  position: absolute;
  top: 17px;
  right: 5px;
`

const row1Bg = require('../../assets/images/skcswin/row-one-bg.png').default

const Content = styled.div`
  box-sizing: border-box;
  width: 584px;
  height: 440px;
  background: url(${row1Bg}) top center no-repeat;
  background-size: 100% 100%;
  border-radius: 12px;
  margin-top: 27px;
  padding: 32px 36px;
`

const Box = styled.div``

const PrizePool: React.FunctionComponent<{ userActivityData: ActivityType }> = ({ userActivityData }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  return (
    <ParticipateWrap>
      <DecorateImage>
        <Image
          src={require('../../assets/images/skcswin/decorate-2.png').default}
          width="123px"
          height="123px"
          alt="decorate-img"
        />
      </DecorateImage>
      <SKCSWinTitle title={t('sKCSWin.PrizePool.Title', { poolPrize: formatNumber(2000, 0) })} />
      <Content>
        <Image
          src={require('../../assets/images/skcswin/prize.png').default}
          width="492px"
          height="197px"
          alt="prize"
        />
      </Content>
    </ParticipateWrap>
  )
}

export default PrizePool
