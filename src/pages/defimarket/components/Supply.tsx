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
import Mask from './Mask'
import marketList from 'constants/marketList'
import { formatNumber } from 'utils/bignumber'

const caculatImg = require('../../../assets/images/defimarket/caculator.png').default

const Warp = styled.div`
  position: relative;
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
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`
const SymbolIcon = styled.img`
  margin-right: 16px;
  width: 48px;
  height: 48px;
`
const SymbolTitle = styled.div`
  font-family: Arial;
  font-size: 24px;
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
  cursor: pointer;
`

const GradientButtonContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`

const Supply: React.FunctionComponent<{ lending: typeof marketList.lending[0] }> = ({ lending }) => {
  const { t } = useTranslation()

  const [visible, setVisible] = React.useState<boolean>(true)

  return (
    <>
      <Warp>
        {/* <Mask /> */}
        {visible && <Calculator lending={lending} setVisible={setVisible} visible={visible} />}
        <SymbolWarp>
          <SymbolIcon src="https://static.kcc.network/logo/skcs.png" alt="token-icon" />
          <SymbolTitle>{lending.name ?? 'sKCS'}</SymbolTitle>
        </SymbolWarp>
        <RowData
          style={{ marginTop: '12px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={
            <RowCenterBox>
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>{t('DEFI_7')}</Text>
              <Tooltip placement="top" title={t('Displayed APY tip')}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            </RowCenterBox>
          }
          content={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
              <div style={{ marginBottom: '0', marginRight: '4px' }}> {lending.supplyAPY}% </div>
              <CaculatorImg src={caculatImg} onClick={() => setVisible(true)} />
            </div>
          }
        />
        <RowData
          style={{ marginTop: '12px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={
            <RowCenterBox>
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>{t('DEFI_8')}</Text>
              <Tooltip placement="top" title={t('Borrow APY tip')}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            </RowCenterBox>
          }
          content={`${formatNumber(lending.borrowAPY, 2)}%`}
        />
        <RowData
          style={{ marginTop: '12px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={
            <RowCenterBox>
              <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>{t('DEFI_9')}</Text>
              <Tooltip placement="top" title={t('Collateral factor tip')}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            </RowCenterBox>
          }
          content={`${formatNumber(lending.collateralFactor * 100, 2)}%`}
        />
        <StyledButton
          onClick={() => window.open(lending.supplyUrl, '_blank')}
          style={{ marginTop: '40px', height: '48px', marginBottom: '24px' }}
        >
          {t('DEFI_10')}
        </StyledButton>
        <GradienButton>
          <GradientText
            onClick={() => window.open(lending.borrowUrl, '_blank')}
            style={{ fontSize: '18px', fontWeight: 700 }}
          >
            {t('DEFI_11')}
          </GradientText>
        </GradienButton>
      </Warp>
    </>
  )
}
export default Supply
