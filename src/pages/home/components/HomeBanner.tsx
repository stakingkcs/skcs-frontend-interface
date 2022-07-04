import StyledButton from 'components/StyledButton'
import React from 'react'
import styled from 'styled-components'
import { formatNumber } from 'utils/bignumber'
import { useStakerState } from '../../../state/hooks'
import BN from 'bignumber.js'
import { useHistory } from 'react-router-dom'
import DanamicBg from '../../../components/DynamicBg/index'
import { useTranslation } from 'react-i18next'

const bg = require('../../../assets/images/home/bg-header.png').default
const mbg = require('../../../assets/images/home/mbg-header.png').default

const Header = styled.div`
  margin: 0 auto; 
  text-align: center;
  /* background: url(${bg}) no-repeat top; */
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
  background: url(${kcsBg}) right bottom no-repeat;
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
  padding-top: 190px;
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
const ButtonWarp = styled.div`
  width: 160px;
  height: 50px;
  margin: 40px 0;
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
  console.log("ttt::", t)
  return (
    <>
      <Header>
        <DanamicBg />
        <Content>
          <Title>
           {t('HOME_1', {asset: ' '})}
            <NumberText>
              {' '}
              {formatNumber(new BN(staker.accumulatedStakedKCSAmount.toString()).div(10 ** 18) ?? 0)}
            </NumberText>
            {t("HOME_2")}
            <NumberText>{formatNumber(new BN(staker.accumulatedReward.toString()).div(10 ** 18))}</NumberText> {t("HOME_3")} <NumberText>{formatNumber(staker.apr * 100)}%</NumberText> {t("HOME_4")}
          </Title>
          <ButtonWarp>
            <BannerStyledButton
              onClick={() => {
                history.push('/staking')
              }}
            >
              {t("HOME_5")}
            </BannerStyledButton>
          </ButtonWarp>
        </Content>
      </Header>
    </>
  )
}
export default HomeBanner
