import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'
// import { useResponsive } from '../../utils/responsive'
import { fetchStakerPublicDataAsync } from 'state/staker'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Steps from './components/Steps'
import FAQ from './components/FAQ'
import BeValidator from './components/BeValidator'
import Audit from './components/Audit'
import HomeBanner from './components/HomeBanner'
import { isMobile } from 'react-device-detect'
import StakeBenefit from './components/StakeBenefit'
import StakeProcess from './components/StakeProcess'
import StakeReward from './components/StakeReward'
import FAQTip from './components/FAQTip'
import FollowUs from './components/FollowUs'

const HomeWrap = styled.div`
  height: auto;
  min-height: calc(100vh - 320px);
  background: #000;
  padding-bottom: 160px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 0;
  }
`

const bannerBg = require('../../assets/images/home/banner.png').default
const bannerBgH5 = require('../../assets/images/home/banner-h5.png').default

const Banner = styled.div`
  box-sizing: border-box;
  height: 600px;
  width: 100%;
  background: url(${bannerBg}) bottom center no-repeat;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    background: url(${bannerBgH5}) bottom center no-repeat;
    height: 320px;
    background-size: contain;
  }
`
const StyledH1 = styled.h1`
  margin-top: 280px;
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 700;
  font-size: 52px;
  display: flex;
  align-items: center;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 32px;
    margin: 103px 0 16px 0;
    text-align: center;
    max-width: 300px;
  }
`

const StakingButton = styled.div`
  width: 160px;
  height: 48px;
  background: #00d092;
  border-radius: 27px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 768px) {
    width: 140px;
    height: 40px;
  }
`

const FaqWarp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
`

const HomePage: React.FunctionComponent = () => {
  // const { isMobile, isTablet, isPC } = useResponsive()
  // const { t, i18n } = useTranslation()

  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (account) {
      dispatch(fetchStakerPublicDataAsync(account))
    }
  }, [account, dispatch])

  return (
    <>
      <Helmet>
        <title>KCC Staking | Buy KCS to Vote | KuCoin Community Chain</title>
        <meta
          name="description"
          content="Staking KuCoin token (KCS), vote and enjoy rewards in KuCoin Community Chain (KCC)."
        />
        <meta name="keywords" content="KuCoin token, KCS, KCC, buy KCS, KCC staking" />
        <meta
          name="twitter:description"
          content="Staking KuCoin token (KCS), vote and enjoy rewards in KuCoin Community Chain (KCC)."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="KCC Staking | Buy KCS to Vote | KuCoin Community Chain" />
      </Helmet>
      <HomeWrap>
        <HomeBanner />
        <StakeBenefit />
        <StakeProcess />
        <StakeReward />
        <FaqWarp>
          <FAQTip title="Have more questions?" desc="Check out our Gitbook for more information" />
          <FollowUs />
        </FaqWarp>
      </HomeWrap>
    </>
  )
}

export default HomePage
