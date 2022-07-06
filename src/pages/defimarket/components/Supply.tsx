import { Tooltip } from 'antd'
import { GradientBgColor, RowCenterBox } from 'components'
import { InfoCircleOutlined } from '@ant-design/icons'
import DataItem from 'components/DataItem'
import StyledButton from 'components/StyledButton'
import GradienButton from 'components/StyledButton/GradientButton'
import Text from 'components/Text'
import { GradientText } from 'components/Text'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import RowData from 'components/RowData'
import Calculator from './Calculator'

const caculatImg = require('../../../assets/images/defimarket/caculator.png').default

const Warp = styled.div`
  width: 384px;
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
    border-radius: 20px;
    margin: 25px auto;
    &:nth-child(3n + 0) {
      margin-right: auto;
    }
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

const CaculatorImg = styled.img`
  width: 20px;
  height: 20px;
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
  const { t } = useTranslation()
  
  return (
    <>
      <Warp>
        <SymbolWarp>
          <SymbolIcon src={''} />
          <SymbolTitle>MJT+sKCS</SymbolTitle>
        </SymbolWarp>
        <RowData
          style={{ marginTop: '12px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={
            <RowCenterBox>
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>{t("DIFI_7")}</Text>
              <Tooltip placement="top" title={t("DIFI_6")}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            </RowCenterBox>
          }
          content={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
              <p style={{ marginBottom: '0' }}> 100%</p>
              {/* <Calculator visible={true}/> */}
              <CaculatorImg src={caculatImg} onClick={() => {}} />
            </div>
          }
        />
        <RowData
          style={{ marginTop: '12px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={
            <RowCenterBox>
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>{t("DIFI_8")}</Text>
              <Tooltip placement="top" title={t("DIFI_8")}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
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
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>{t("DIFI_9")}</Text>
              <Tooltip placement="top" title={t("DIFI_12")}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            </RowCenterBox>
          }
          content={`80%`}
        />
        <StyledButton style={{ marginTop: '40px', height: '48px' }}>{t("DIFI_10")}</StyledButton>
        <GradienButton>
          <GradientText style={{ fontSize: '18px', fontWeight: 700 }}>{t("DIFI_11")}</GradientText>
        </GradienButton>
      </Warp>
    </>
  )
}
export default Supply
