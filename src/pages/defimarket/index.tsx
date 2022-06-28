import React from 'react'
import styled from 'styled-components'
import Banlance from './components/Banlance'
import Liquidity from './components/Liquitity'
import Supply from './components/Supply'

const gradientBg = require('../../assets/images/gradient-bg.png').default
const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  text-align: left;
  color: #ffffff;
  margin: 52px 0 12px 0;
  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
    margin: 36px 0 12px 0;
  }
`
const Desc = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  text-align: left;
  color: rgba(180, 183, 193, 1);
  margin-bottom: 24px;
  max-width: 900px;
  @media (max-width: 768px) {
    font-size: 14px;
    text-align: center;
    width: 90%;
  }
`

const Warp = styled.div`
  padding: 85px 0;
  height: auto;
  min-height: calc(100vh - 100px);
  width: 100%;
  background: url(${gradientBg}) center -200px no-repeat;
  background-size: 1600px auto;
  color: white;
  @media (max-width: 768px) {
    text-align: center;
  }
`
export const Content = styled.div`
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
  }
`
const DataWarp = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  &:nth-child(3) {
    margin-right: 0 !important;
  }
`

const DeFiMarket: React.FunctionComponent = () => {
  return (
    <Warp>
      <Title style={{ textAlign: 'center' }}>Use sKCS across the DeFi ecosystem</Title>
      <Content>
        <Banlance />
        <Title>Liquidity</Title>
        <Desc>Use stSOL in liquidity mining pools</Desc>
        <DataWarp>
          <Liquidity />
          <Liquidity />
          <Liquidity />
        </DataWarp>

        <Title>Supply & Borrow</Title>
        <Desc>Supply sKCS to earn interest, collateral to borrow other assets.</Desc>
        <DataWarp>
          <Supply />
          <Supply />
        </DataWarp>
      </Content>
    </Warp>
  )
}
export default DeFiMarket
