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

const gradientBg = require('../../assets/images/gradient-bg.png').default

export const HomeWrap = styled.div`
  padding-top: 140px;
  height: auto;
  min-height: calc(100vh - 100px);
  width: 100%;
  background-size: 1600px auto;
  background: url(${gradientBg}) center -400px no-repeat;
  @media (max-width: 768px) {
    background: url(${gradientBg}) top center no-repeat;
    padding-top: 10px;
    background-attachment: fixed;
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
  // const { isMobile, isTablet, isPC } = useResponsive()
  const { t } = useTranslation()

  const { account } = useWeb3React()
  const dispatch = useDispatch()

  return (
    <>
      <Helmet>
        <title>Staking | sKCS</title>
        <meta name="description" content="Stake KCS and receive sKCS as proof to earn staking rewards with high APY" />
        <meta name="keywords" content="stake KCS, sKCS" />
        <meta
          name="twitter:description"
          content="Stake KCS and receive sKCS as proof to earn staking rewards with high APY"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="stake KCS, sKCS" />
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
