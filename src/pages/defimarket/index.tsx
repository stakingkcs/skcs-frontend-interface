import React from 'react'
import styled from 'styled-components'

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

export const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* N100 */
  color: #efeff2;
`

const DeFiMarket: React.FunctionComponent = () => {
  return (
    <HomeWrap>
      <Content>
        <Title>Use stKCS across the DeFi ecosystem</Title>
      </Content>
    </HomeWrap>
  )
}
export default DeFiMarket
