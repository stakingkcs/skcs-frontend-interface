import React from 'react'
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
// import { useResponsive } from '../../utils/responsive'
import { fetchPoolsUserDataAsync } from 'state/pools'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import Dashboard from './components/DashBoard'
import Rules from './components/Rules'
import ValidatorTable from './components/ValidatorTable'

export const HomeWrap = styled.div`
  height: auto;
  width: 100%;
`

export const Banner = styled.div`
  width: 100%;
  height: 340px;
  background: #000;
  @media (max-width: 768px) {
    height: 325px;
  }
`

export const ContentWrap = styled.div`
  background: #ececf0;
  width: 100%;
  height: auto;
  position: relative;
  @media (max-width: 768px) {
    padding: 0 20px 20px 20px;
  }
`

export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  height: auto;
  top: -174px;
  @media (max-width: 768px) {
    top: -274px;
  }
`

export const PageTitle = styled.h1`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  display: flex;
  align-items: center;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`

const StakingPage: React.FunctionComponent = () => {
  // const { isMobile, isTablet, isPC } = useResponsive()
  // const { t, i18n } = useTranslation()

  const { account } = useWeb3React()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch])

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
        <Banner />
        <ContentWrap>
          <Content>
            <PageTitle>Staking to Vote</PageTitle>
            <Dashboard />
            <Rules />
            <ValidatorTable />
          </Content>
        </ContentWrap>
      </HomeWrap>
    </>
  )
}

export default StakingPage
