import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { ColumnCenterBox, RowCenterBox } from 'components'
import DataItem from 'components/DataItem'
import StyledInput from 'components/StyledInput'
import { url } from 'inspector'
import React from 'react'
import styled from 'styled-components'
import StyledButton from 'components/StyledButton'
import FAQTip from './FAQTip'
import { isMobile } from 'react-device-detect'

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
  @media (max-width: 768px) {
    font-size: 24px;
    margin: 0 8px;
  }
`
const Desc = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  color: rgba(180, 183, 193, 1);
  margin-top: 10px;
  max-width: 900px;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    width: 90%;
  }
`
const ButtonWarp = styled.div`
`

const Panel = styled.div`
  width: 540px;
  height: 380px;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.5);
  margin: 70px 0 0 0;
  padding: 40px 32px;
  @media (max-width: 768px) {
   width:327px;
   height: 544px;
   padding: 32px 24px;
   margin: 40px 0 0 0;
  }
`
const PanelText = styled.p`
  font-family: 'Arial';
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
`
const DataPanelWarp = styled.div`
  width: 100%;
  margin: 32px 0;
`

const StakeReward: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = React.useState<string>('')
  const [error, setError] = React.useState<{ hasError: boolean; errorInfo: string }>({ hasError: false, errorInfo: '' })
  const renderData = () => {
    if (!isMobile) {
      return (
        <RowCenterBox style={{width: '100%'}} align="flex-start" justify="space-between">
          <DataItem
            title="APR"
            titleExtra={
              <Tooltip
                placement="top"
                title="APR is denominated in terms of sKCS, not USD. The calculation is based on the sKCS/KCS exchange rate 2 days ago, it is not compounded and is not a guaranteed or promised return or profit.APR = (exchange price 48 hours ago - exchange price at this time)*180*100%"
              >
                <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            }
            balance="3.5%"
          />
        <DataItem
            title="Monthly Rewards"
            balance="0.03KCS"
            uBalance="≈$0.0026"
          />
        <DataItem
            title="Yearly Rewards"
            balance="0.03KCS"
            uBalance="≈$0.0026"
          />
        </RowCenterBox>)
    } else {
      return (
        <ColumnCenterBox style={{width: '100%', height: '272px'}} justify="space-between" align="flex-start">
          <DataItem
            title="APR"
            titleExtra={
              <Tooltip
                placement="top"
                title="APR is denominated in terms of sKCS, not USD. The calculation is based on the sKCS/KCS exchange rate 2 days ago, it is not compounded and is not a guaranteed or promised return or profit.APR = (exchange price 48 hours ago - exchange price at this time)*180*100%"
              >
                <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            }
            balance="3.5%"
          />
        <DataItem
            title="Monthly Rewards"
            balance="0.03KCS"
            uBalance="≈$0.0026"
          />
        <DataItem
            title="Yearly Rewards"
            balance="0.03KCS"
            uBalance="≈$0.0026"
          />
        </ColumnCenterBox>)
    }



  }

  return (
    <>
      <StakeWarp>
        <Title>Rewards Calculator</Title>
        <Desc>Calculate your staking rewards and stake KCS now</Desc>
        <Panel>
          <PanelText>Enter the staking amount</PanelText>
          <StyledInput setVaule={setInputValue} value={inputValue} setError={setError} error={error} maxLimit={'12'} />
          <DataPanelWarp>
            {renderData()}
          </DataPanelWarp>
          <StyledButton>
             Stake Now
          </StyledButton>
        </Panel>
      </StakeWarp>
    </>
  )
}

export default StakeReward
