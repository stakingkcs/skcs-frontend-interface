import React from 'react'

import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

const Header = styled.div`
  width: 100%;
  height: 864px;
  text-align: center;

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
  color: #41E6AF;
  white-space: nowrap;
  margin: 0 10px;
  @media (max-width: 768px) {
    margin: 0 5px;
    font-size: 20px;
  }
`

const HomeBanner: React.FunctionComponent = () => {

  return (
    <>
      <Header style={{position:"relative" }}>
        <BgImage src={require('../../../assets/images/home/bg-header.png').default} />
        <div style={{position:"absolute", top: '100px', left: '100px'}}>
          <Title>
            The KCC staking protocol currently has <NumberText> $ 64,846,849.846</NumberText>
            of KCS staking <NumberText>$ 8,884,324.846</NumberText> of rewards paid <NumberText> 3.5%</NumberText> APR
          </Title>
        </div>
      </Header>
    </>
  )
}
export default HomeBanner
