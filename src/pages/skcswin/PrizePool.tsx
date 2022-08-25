import { useWeb3React } from '@web3-react/core'
import { Image, RowCenterBox } from 'components'
import { RowBetween } from 'components/Row'
import StyledButton from 'components/StyledButton'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useAppDispatch } from 'state'
import { toggleConnectWalletModalShow } from 'state/wallet/actions'
import styled from 'styled-components'
import { formatNumber } from '../../utils/bignumber'
import SKCSWinTitle from './components/SKCSTitle'
import { ActivityType } from './index'
import { getPrizeByRank } from '../../utils/skcsWin'

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
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`
const GreenDot = styled.div`
  width: 9px;
  height: 9px;
  background: #00d092;
  border-radius: 50%;
`

const RankText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  color: #efeff2;
  margin: 0 12px;
`

const BorderLine = styled.div`
  flex: 1;
  opacity: 0.5;
  border-top: 1px dashed #ffffff;
`

const PrizeItem = styled(RowBetween)`
  align-items: center;
`

const PrizeText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #efeff2;
  margin-right: 16px;
`

const GradientText = styled.div`
  font-family: 'Hiragino Kaku Gothic StdN';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  display: inline-block;
  align-items: center;
  background: linear-gradient(93.69deg, #41e6af 0.42%, #b65cf1 82.72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

const PrizePool: React.FunctionComponent<{ userActivityData: ActivityType; registerByAccount: any }> = ({
  userActivityData,
}) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

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
        <PrizeItem style={{ marginTop: '34px' }}>
          <GreenDot />
          <RankText>{t('TOP 4-23')}</RankText>
          <BorderLine />
          <RankText style={{ marginLeft: '22px' }}>400 USDT</RankText>
        </PrizeItem>
        <PrizeItem style={{ marginTop: '15px' }}>
          <GreenDot />
          <RankText>{t('TOP 24-123')}</RankText>
          <BorderLine />
          <RankText style={{ marginLeft: '22px' }}>600 USDT</RankText>
        </PrizeItem>
        <RowCenterBox style={{ marginTop: '25px' }}>
          {!userActivityData.registered || !account ? <PrizeText>{t('YourPrize')}</PrizeText> : null}
          {!account && (
            <StyledButton
              onClick={() => dispatch(toggleConnectWalletModalShow({ show: true }))}
              style={{ width: '160px', height: '40px', fontSize: '14px' }}
            >
              {t('HOME_21')}
            </StyledButton>
          )}
          {account && !userActivityData.registered && (
            <StyledButton
              onClick={() => dispatch(toggleConnectWalletModalShow({ show: true }))}
              style={{ width: '160px', height: '40px', fontSize: '14px' }}
            >
              {t('Register')}
            </StyledButton>
          )}
          {userActivityData.registered && (
            <PrizeText>
              <Trans
                i18nKey="Prize Result"
                values={{
                  rank: `TOP ${userActivityData.rank}`,
                  rewards: formatNumber(getPrizeByRank(userActivityData.rank), 0),
                }}
                components={{ gradientText: <GradientText /> }}
              />
            </PrizeText>
          )}
        </RowCenterBox>
      </Content>
    </ParticipateWrap>
  )
}

export default PrizePool
