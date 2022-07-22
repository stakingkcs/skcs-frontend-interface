import React from 'react'
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
// import { useResponsive } from '../../utils/responsive'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import StakingPanel from './components/StakingPanel'
import FAQ from './components/FAQ'
import Statistics from './components/Statistics'
import DanamicCenterBg from '../../components/DynamicBg/DynamicCenterBg'
import { useTranslation } from 'react-i18next'

const gradientBg = require('../../assets/images/bg.jpg').default
const mGradientBg = require('../../assets/images/mobile_bg.jpg').default

export const HomeWrap = styled.div`
  padding-top: 140px;
  height: auto;
  min-height: calc(100vh - 100px);
  width: 100%;
  background: url(${gradientBg}) top center no-repeat fixed;
  background-size: 100% 100%;
  @media (max-width: 768px) {
    background: url(${mGradientBg}) top center no-repeat fixed;
    background-size: 100% 100%;
    padding-top: 10px;
  }
`

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: auto;
  z-index: 99;
`

const BottomPanel = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  height: auto;
  padding-top: 64px;
  padding-bottom: 60px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    padding-bottom: 22px;
  }
`

const FaqWrap = styled.div`
  width: 568px;
  height: 100%;
  order: 0;
  @media (max-width: 768px) {
    width: 100%;
    order: 1;
  }
`
const StaticsPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 600px;
  height: 100%;
  border: 1;
  order: 1;
  @media (max-width: 768px) {
    width: 100%;
    order: 0;
  }
`

const StakingPage: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const dispatch = useDispatch()

  return (
    <>
      <Helmet>
        <title>{t('STAKE_74')}</title>
        <meta name="description" content={t('STAKE_76')} />
        <meta name="keywords" content={t('STAKE_77')} />
        <meta name="twitter:description" content={t('STAKE_76')} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('STAKE_77')} />
      </Helmet>
      <HomeWrap>
        <Content>
          {/* <DanamicCenterBg /> */}
          <div style={{ position: 'relative', zIndex: 999 }}>
            <StakingPanel />
            <BottomPanel>
              <FaqWrap>
                <FAQ />
              </FaqWrap>
              <StaticsPanel>
                <Statistics />
              </StaticsPanel>
            </BottomPanel>
          </div>
        </Content>
      </HomeWrap>
    </>
  )
}

export default StakingPage
