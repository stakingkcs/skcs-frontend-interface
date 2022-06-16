import { url } from 'inspector'
import React from 'react'
import styled from 'styled-components'
const bg = require('../../../assets/images/home/re-bg.png').default
const StakeWarp = styled.div`
  height: 995px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${bg}) no-repeat center;
  &:after {
    width: 120px;
    height: 10px;
    background: red;
    border: 1px dashed #ffffff;
    margin: 0 25px;
  }
`
const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #ffffff;
  margin: 259px 0 0 0;
  /* @media (max-width: 768px) {
    font-size: 26px;
    margin: 0 8px;
  } */
`
const Desc = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color:rgba(180, 183, 193, 1);
  margin-top: 10px;
  max-width: 900px;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 32px;
    padding: 0 24px;
    margin-top: 32px;
    text-align: center;
    width: 90%;
  }
`

const Panel = styled.div`
    width: 540px;
    height: 380px;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.5);
    margin: 70px 0 0 0;
    padding: 40px 32px;
`
const PanelText = styled.p`
  font-family: 'Arial';
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
`

const StakeReward: React.FunctionComponent = () => {
  return (
    <>
      <StakeWarp>
      <Title>Rewards Calculator</Title>
      <Desc>Calculate your staking rewards and stake KCS now</Desc>
      <Panel>
      <PanelText>Enter the staking amount</PanelText>
      </Panel>
      </StakeWarp>

    </>
  )
}

export default StakeReward
