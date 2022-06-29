import RowData from 'components/RowData'
import StyledButton from 'components/StyledButton'
import React from 'react'
import styled from 'styled-components'
import GhostButton from 'components/StyledButton/GhostButton'
import { GradientBgColor } from 'components'
import GradienButton from 'components/StyledButton/GradientButton'
import { GradientText } from 'components/Text'
import { isMobile } from 'react-device-detect'

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  text-align: left;
  color: #ffffff;
  margin: 52px 0 0 12px;
  @media (max-width: 768px) {
    font-size: 24px;
    text-align: center;
    margin: 36px 0 0 12px;
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
  color: rgba(180, 183, 193, 1);
  margin-bottom: 24px;
  max-width: 900px;
  @media (max-width: 768px) {
    font-size: 14px;
    text-align: center;
    width: 90%;
  }
`

const LiquidityWarp = styled.div`
  width: 384px;
  height: 386px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.5);
  padding: 36px 24px;
  margin: 0 25px 25px 0;
  @media (max-width: 768px) {
    width: 343px;
  }
  &:nth-child(3n + 0) {
    margin-right: 0;
  }
`
const SymbolWarp = styled.div`
  display: flex;
  justify-content: flex-start;
`
const SymbolIcon = styled.img`
  object-fit: cover;
  margin-right: 16px;
`
const SymbolTitle = styled.p`
  font-family: Arial;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 0;
`
const GradientButton = styled.div`
  position: relative;
  border: none;
  box-shadow: none;
  overflow: hidden;
  ${GradientBgColor}
  &:hover {
    ${GradientBgColor}
  }
`

const GradientButtonContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`

const Liquidity: React.FunctionComponent = () => {
  return (
    <>
      
      <LiquidityWarp>
        <SymbolWarp>
          <SymbolIcon />
          <SymbolTitle>MJT+SKCS</SymbolTitle>
        </SymbolWarp>
        <RowData
          style={{ marginTop: isMobile ? '15px' : '23px' }}
          tstyle={{ fontSize: '18px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title="Apr"
          content={`100%`}
        />
        <RowData
          style={{ marginTop: isMobile ? '22px' : '23px' }}
          title="Total Liquidity"
          content={`$690,000,0`}
          tstyle={{ fontSize: '18px' }}
          dstyle={{ fontWeight: 700, fontSize: '24px' }}
        />
        <StyledButton style={{ margin: '35px 0 24px 0', height: '48px' }}>Add Liquidity</StyledButton>
        <GradienButton>
          <GradientText style={{ fontSize: '18px', fontWeight: 700}}>swap</GradientText>
        </GradienButton>
      </LiquidityWarp>
    </>
  )
}
export default Liquidity
