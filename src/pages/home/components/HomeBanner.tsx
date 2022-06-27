import StyledButton from 'components/StyledButton'
import React from 'react'
import styled from 'styled-components'
import { formatNumber } from 'utils/bignumber'
import { useStakerState } from '../../../state/hooks'
import BN from 'bignumber.js'

const bg = require('../../../assets/images/home/bg-header.png').default
const mbg = require('../../../assets/images/home/mbg-header.png').default

const Header = styled.div`
  margin: 0 auto;
  width: 1440px;
  height: 864px;
  text-align: center;
  background: url(${bg}) no-repeat top;
  padding: 0 120px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 26px;
    background: url(${mbg}) no-repeat top;
  }
`

const Content = styled.div`
  width: 100%;
`

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-size: 52px;
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
    font-size: 20px;
  }
`
const ButtonWarp = styled.div`
  width: 160px;
  height: 50px;
  margin: 40px 0;
`

const HomeBanner: React.FunctionComponent = () => {
  const staker = useStakerState()
  return (
    <>
      <Header>
        <Content>
          <Title>
            The KCC staking protocol currently has{' '}
            <NumberText>
              {' '}
              ${formatNumber(new BN(staker.accumulatedStakedKCSAmount.toString()).div(10 ** 18) ?? 0)}
            </NumberText>
            of KCS staking{' '}
            <NumberText>${formatNumber(new BN(staker.accumulatedReward.toString()).div(10 ** 18))}</NumberText> of
            rewards paid <NumberText>${formatNumber(staker.apr)}%</NumberText> APR
          </Title>
          <ButtonWarp>
            <StyledButton>Stake Now</StyledButton>
          </ButtonWarp>
        </Content>
      </Header>
    </>
  )
}
export default HomeBanner
