import DoubleTokenLogo from 'components/DoubleTokenLogo'
import RowData from 'components/RowData'
import StyledButton from 'components/StyledButton'
import GradienButton from 'components/StyledButton/GradientButton'
import { GradientText } from 'components/Text'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { formatNumber } from 'utils/bignumber'
import marketList from '../../../constants/marketList'

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
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  padding: 36px 24px;
  margin: 0 25px 25px 0;
  @media (max-width: 768px) {
    width: 343px;
    margin: 25px auto;
  }
  &:nth-child(3n + 0) {
    margin-right: 0;
  }
`
const SymbolWarp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const SymbolTitle = styled.p`
  font-family: Arial;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 0;
  margin-left: 16px;
`

const Liquidity: React.FunctionComponent<{
  liquidity: typeof marketList.liquidity[0]
}> = ({ liquidity }) => {
  const { t } = useTranslation()
  return (
    <>
      <LiquidityWarp>
        <SymbolWarp>
          <DoubleTokenLogo AToken={liquidity.AToken} BToken={liquidity.BToken} />
          <SymbolTitle>{liquidity.lpName}</SymbolTitle>
        </SymbolWarp>
        <RowData
          style={{ marginTop: isMobile ? '15px' : '24px' }}
          tstyle={{ fontSize: '18px' }}
          dstyle={{ color: '#00D092', fontWeight: 700, fontSize: '24px' }}
          title={t('DEFI_13')}
          content={`${formatNumber(liquidity.apr, 2)}%+`}
        />
        <RowData
          style={{ marginTop: isMobile ? '22px' : '12px' }}
          title={t('DEFI_14')}
          content={`$${formatNumber(liquidity.liquidity, 0)}+`}
          tstyle={{ fontSize: '18px' }}
          dstyle={{ fontWeight: 700, fontSize: '24px' }}
        />
        <StyledButton
          onClick={() => window.open(liquidity.addLiquidityUrl, '_blank')}
          style={{ margin: '24px 0 24px 0', height: '48px' }}
        >
          {t('DEFI_15')}
        </StyledButton>
        <GradienButton>
          <GradientText
            onClick={() => window.open(liquidity.swapUrl, '_blank')}
            style={{ fontSize: '18px', fontWeight: 700 }}
          >
            {t('DEFI_16')}
          </GradientText>
        </GradienButton>
      </LiquidityWarp>
    </>
  )
}
export default Liquidity
