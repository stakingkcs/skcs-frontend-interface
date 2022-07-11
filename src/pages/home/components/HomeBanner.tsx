import StyledButton from 'components/StyledButton'
import React from 'react'
import styled from 'styled-components'
import { formatNumber } from 'utils/bignumber'
import { useStakerState } from '../../../state/hooks'
import BN from 'bignumber.js'
import { Link, useHistory } from 'react-router-dom'
import DanamicBg from '../../../components/DynamicBg/index'
import { Trans, useTranslation } from 'react-i18next'

const mbg = require('../../../assets/images/home/mbg-header.png').default

const Header = styled.div`
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 6;

  @media (max-width: 768px) {
    padding: 0;
    width: 100%;
    background: url(${mbg}) no-repeat top;
  }
`

const kcsBg = require('../../../assets/images/home/kcs-bg.png').default
const Content = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 864px;
  background: url(${kcsBg}) right 80% no-repeat;
  background-size: 419px 451px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 26px;
    background: none;
  }
`

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-size: 54px;
  line-height: 62px;
  text-align: left;
  width: 944px;
  color: #ffffff;
  padding-top: 243px;
  @media (max-width: 768px) {
    padding-top: 70px;
    width: 100%;
    font-size: 32px;
  }
`
const NumberText = styled.span`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 64px;
  text-align: left;
  color: #41e6af;
  white-space: nowrap;
  margin: 0 10px;
  @media (max-width: 768px) {
    margin: 0 5px;
    font-size: 32px;
  }
`
const ButtonWarp = styled(Link)`
  width: 160px;
  height: 50px;
  margin: 40px 0;
  display: block;
`

const BannerStyledButton = styled(StyledButton)`
  &:hover {
    opacity: 0.8;
  }
`

const HomeBanner: React.FunctionComponent = () => {
  const staker = useStakerState()
  const history = useHistory()
  const { t } = useTranslation()
  return (
    <>
      <Header>
        <DanamicBg />
        <Content>
          <Title>
            {/* {t('HOME_1', {
              totalKCS: formatNumber(new BN(staker.accumulatedStakedKCSAmount.toString()).div(10 ** 18) ?? 0),
              totalRewards: formatNumber(new BN(staker.accumulatedReward.toString()).div(10 ** 18)),
              apy: formatNumber(staker.apr * 100),
            })} */}

            <Trans
              i18nKey="HOME_1" // optional -> fallbacks to defaults if not provided
              values={{
                totalKCS: formatNumber(new BN(staker.accumulatedStakedKCSAmount.toString()).div(10 ** 18) ?? 0),
                totalRewards: formatNumber(new BN(staker.accumulatedReward.toString()).div(10 ** 18)),
                apy: formatNumber(staker.apr * 100),
              }}
              components={{ number: <NumberText /> }}
            />
          </Title>
          <ButtonWarp to="/staking">
            <BannerStyledButton>{t('HOME_5')}</BannerStyledButton>
          </ButtonWarp>
        </Content>
      </Header>
    </>
  )
}
export default HomeBanner
