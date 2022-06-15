import React from 'react'
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
// import { useResponsive } from '../../utils/responsive'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import StakingPanel from './components/StakingPanel'

const gradientBg = require('../../assets/images/gradient-bg.png').default

export const HomeWrap = styled.div`
  padding-top: 140px;
  height: auto;
  min-height: calc(100vh - 100px);
  width: 100%;
  background: url(${gradientBg}) center -200px no-repeat;
  background-size: 1600px auto;
`

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: auto;
`

const StakingPage: React.FunctionComponent = () => {
  // const { isMobile, isTablet, isPC } = useResponsive()
  // const { t, i18n } = useTranslation()

  const { account } = useWeb3React()
  const dispatch = useDispatch()

  return (
    <>
      <Helmet>
        <title>KuCoin Token Staking | Earn KCS Rewards | KuCoin Community Chain</title>
        <meta
          name="description"
          content="Buy KCS for staking and voting. Users can earn high APR rewards with KCC staking."
        />
        <meta name="keywords" content="KuCoin token, KCS, KCC, buy KCS, KCS staking" />
      </Helmet>
      <HomeWrap>
        <Content>
          <StakingPanel />
        </Content>
      </HomeWrap>
    </>
  )
}

export default StakingPage
