import React from 'react'
import styled from 'styled-components'
import StyledButton from 'components/StyledButton'
import { useStakerState } from '../../../state/hooks'
import BN from 'bignumber.js'
import { formatNumber } from 'utils/bignumber'

const Header = styled.div`
  width: 100%;
  height: 864px;
  text-align: center;
  position: relative;
`
const BgImage = styled.img`
  object-fit: cover;
  text-align: center;
  z-index: -1;
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
    font-size: 26px;
    line-height: 31px;
    margin: 0 8px;
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
      <Header style={{}}>
        <BgImage src={require('../../../assets/images/home/bg-header.png').default} />
        <div style={{ position: 'absolute', top: '100px', left: '100px' }}>
          <Title>
            The KCC staking protocol currently has{' '}
            <NumberText> ${formatNumber(staker.accumulatedStakedKCSAmount ?? 0)}</NumberText>
            of KCS staking <NumberText>${formatNumber(staker.accumulatedReward)}</NumberText> of rewards paid{' '}
            <NumberText>${formatNumber(staker.apr)}%</NumberText> APR
          </Title>
          <ButtonWarp>
            <StyledButton>Stake Now</StyledButton>
          </ButtonWarp>
        </div>
      </Header>
    </>
  )
}
export default HomeBanner
