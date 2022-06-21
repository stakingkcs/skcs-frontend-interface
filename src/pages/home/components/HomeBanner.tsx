import React from 'react'

import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import StyledButton from 'components/StyledButton'

const bg = require('../../../assets/images/home/bg-header.png').default
const mbg = require('../../../assets/images/home/mbg-header.png').default

const Header = styled.div`
  width: 100%;
  height: 864px;
  text-align: center;
  background: url(${bg}) no-repeat top;
  padding: 0 100px;
  @media (max-width: 768px) {
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
  return (
    <>
      <Header>
        <Content>
          <Title>
            The KCC staking protocol currently has <NumberText> $ 64,846,849.846</NumberText>
            of KCS staking <NumberText>$ 8,884,324.846</NumberText> of rewards paid <NumberText> 3.5%</NumberText> APR
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
