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
import dayjs from 'dayjs'
import { useResponsive } from '../../utils/responsive'
import { useLanguage } from '../../state/application/hooks'

const ParticipateWrap = styled.div`
  position: relative;
  width: 584px;
`

const DecorateImage = styled.div`
  position: absolute;
  top: 20px;
  right: 5px;
  z-index: 2;
`

const row1Bg = require('../../assets/images/skcswin/row-one-bg.png').default

const Content = styled.div<{ isMobile: boolean; lang: string; unfold: boolean }>`
  box-sizing: border-box;
  width: 584px;
  /* height: 292px; */
  overflow: hidden;
  height: ${({ isMobile, lang, unfold }) => {
    if (isMobile) {
      return 'auto'
    }

    if (lang === 'en' && unfold === true) {
      return 'auto'
    }

    return '574px'
  }};
  background: url(${row1Bg}) top center no-repeat;
  background-size: 99% 99%;
  border-radius: 12px;
  margin-top: 27px;
  padding: 35px 32px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`

const GradientText = styled.div`
  font-family: 'Hiragino Kaku Gothic StdN';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  background: linear-gradient(93.69deg, #41e6af 0.42%, #b65cf1 82.72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

const RulesText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  line-height: 28px;
  color: #efeff2;
  margin-top: 8px;
`

const bg = require('../../assets/images/skcswin/upcoming.png').default

const RuleItems = styled.div<{ isMobile: boolean; lang: string; unfold: boolean }>`
  overflow: hidden;
  height: ${({ isMobile, lang, unfold }) => {
    if (isMobile || lang !== 'en') {
      return 'auto'
    }

    if (lang === 'en' && unfold === true) {
      return 'auto'
    }

    return '430px'
  }};
`

const Upcoming = styled.div`
  width: 584px;
  height: 182px;
  background: url(${bg}) top center no-repeat;
  background-size: 100% auto;
  border-radius: 12px;
  margin-top: 22px;
`

const Rules: React.FunctionComponent<{ userActivityData: ActivityType }> = ({ userActivityData }) => {
  const { t } = useTranslation()
  const { isMobile } = useResponsive()
  const lang = useLanguage()
  const [unfold, setUnfold] = React.useState<boolean>(false)

  return (
    <ParticipateWrap>
      <DecorateImage>
        <Image
          src={require('../../assets/images/skcswin/decorate-4.png').default}
          width="96px"
          height="96px"
          alt="decorate-img"
        />
      </DecorateImage>
      <SKCSWinTitle title={t('Campaign Rules')} />
      <Content style={{ marginBottom: '32px' }} isMobile={isMobile} lang={lang} unfold={unfold}>
        <GradientText>{t('SKCS RULES')}</GradientText>
        <RuleItems isMobile={isMobile} lang={lang} unfold={unfold}>
          {userActivityData.rules.keyList.map((key, index) => {
            return (
              <RulesText key={index}>
                {`${index + 1}:`}
                {t(key)}
              </RulesText>
            )
          })}
        </RuleItems>
        {lang === 'en' && (
          <RulesText style={{ cursor: 'pointer', color: '#CB40D2' }} onClick={() => setUnfold((fold) => !fold)}>
            {unfold ? 'Fold' : 'Unfold'}
          </RulesText>
        )}
      </Content>
      {/* <SKCSWinTitle title={t('Upcoming Campaign')} /> */}
      {/* <Upcoming /> */}
    </ParticipateWrap>
  )
}

export default Rules
