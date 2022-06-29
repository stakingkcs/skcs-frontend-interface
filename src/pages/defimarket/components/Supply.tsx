import { Tooltip } from 'antd'
import { GradientBgColor, RowCenterBox } from 'components'
import { QuestionCircleOutlined } from '@ant-design/icons'
import DataItem from 'components/DataItem'
import StyledButton from 'components/StyledButton'
import GradienButton from 'components/StyledButton/GradientButton'
import Text from 'components/Text'
import { GradientText } from 'components/Text'
import React from 'react'
import styled from 'styled-components'
import RowData from 'components/RowData'

const Warp = styled.div`
  width: 384px;
  height: 386px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.5);
  padding: 36px 24px;
  margin-right: 25px;
  &:nth-child(3n + 0) {
    margin-right: 0;
  }
  @media (max-width: 768px) {
    margin-right: 0;
    width: 343px;
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

const Supply: React.FunctionComponent = () => {
  return (
    <>
      <Warp>
        <SymbolWarp>
          <SymbolIcon src={''}/>
          <SymbolTitle>MJT+SKCS</SymbolTitle>
        </SymbolWarp>
        <RowData
          style={{ marginTop: '12px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={
            <RowCenterBox>
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>Supply APY</Text>
              <Tooltip placement="top" title="supply APR">
                <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            </RowCenterBox>
          }
          content={`100%`}
        />
        <RowData
          style={{ marginTop: '12px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={
            <RowCenterBox>
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>Borrow APY</Text>
              <Tooltip placement="top" title="Borrow APY">
                <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            </RowCenterBox>
          }
          content={`80%`}
        />
        <RowData
          style={{ marginTop: '12px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={
            <RowCenterBox>
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>Collateral Factor</Text>
              <Tooltip placement="top" title="Collateral Factor">
                <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            </RowCenterBox>
          }
          content={`80%`}
        />
        <StyledButton style={{ marginTop: '40px', height: '48px' }}>Supply</StyledButton>
        <GradienButton>
          <GradientText style={{ fontSize: '18px', fontWeight: 700 }}>Borrow</GradientText>
        </GradienButton>
      </Warp>
    </>
  )
}
export default Supply
