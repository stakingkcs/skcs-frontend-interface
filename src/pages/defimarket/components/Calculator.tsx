import { InfoCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tooltip } from 'antd'
import BN from 'bignumber.js'
import { RowCenterBox } from 'components'
import DataItem from 'components/DataItem'
import StyledButton from 'components/StyledButton'
import StyledInput from 'components/StyledInput'
import marketList from 'constants/marketList'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Image } from '../../../components/index'
import { useSKCSPrice } from '../../../state/hooks'
import { formatNumber } from '../../../utils/bignumber'
import { useResponsive } from '../../../utils/responsive'

const closeIcon = require('../../../assets/images/Icons/close.png').default

const CloseIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`

const Warp = styled.div<{ visible: boolean }>`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100vh;
  inset: 0;
  z-index: 9999999;
  background: rgba(0, 0, 0, 0.4);
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const Panel = styled.div`
  position: relative;
  width: 700px;
  min-height: 362px;
  height: auto;
  padding: 32px;
  background: #000000;
  border-radius: 16px;
  margin: auto;
  padding: 40px 32px;
  @media (max-width: 768px) {
    width: 96%;
    height: auto;
    padding: 32px 24px;
    margin: 40px auto 0 auto;
    box-sizing: border-box;
  }
`
const PanelText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
  width: 100%;
  text-align: left;
  margin-bottom: 16px;
`
const DataPanelWarp = styled.div`
  width: 100%;
  margin: 32px 0;
  @media (max-width: 768px) {
    margin: 32px 0;
  }
`

export interface CaculatorProps {
  visible: boolean
  setVisible: any
  lending: typeof marketList.lending[0]
  toggleVisible?: any
}

const Calculator: React.FunctionComponent<CaculatorProps> = ({ lending, ...props }) => {
  const { t } = useTranslation()
  const { account, library } = useWeb3React()
  const { isMobile } = useResponsive()
  const [inputValue, setInputValue] = React.useState<string>('')
  const [error, setError] = React.useState<{ hasError: boolean; errorInfo: string }>({ hasError: false, errorInfo: '' })
  const [isHover, setIsHover] = React.useState<boolean>(false)
  const [isHover1, setIsHover1] = React.useState<boolean>(false)
  const [isHover2, setIsHover2] = React.useState<boolean>(false)
  const skcsPrice = useSKCSPrice()

  const formatInput = React.useMemo(() => {
    if (error.hasError || inputValue === '') {
      return 0
    }
    return Number(inputValue)
  }, [inputValue, error])

  return (
    <Warp visible={props.visible}>
      <Panel>
        <CloseIcon onClick={() => props.setVisible(() => false)}>
          <Image src={closeIcon} width="20px" height="auto" alt="close-icon" />
        </CloseIcon>
        <PanelText>{t('Enter the supply amount')}</PanelText>
        <StyledInput
          checkBalance={false}
          checkAccount={false}
          inputValue={inputValue}
          setVaule={setInputValue}
          setError={setError}
          error={error}
          showMax={false}
          maxLimit={String(Math.pow(10, 18))}
          showPrefix={false}
          suffix="sKCS"
        />
        <DataPanelWarp>
          <RowCenterBox
            style={{ width: '100%', flexFlow: isMobile ? 'column nowrap' : 'row nowrap' }}
            align="flex-start"
            justify={isMobile ? 'flex-start' : 'space-between'}
          >
            <DataItem
              title="APY"
              titleExtra={
                <Tooltip placement="top" title={t('Displayed APY tip')}>
                  <InfoCircleOutlined
                    onMouseEnter={() => setIsHover(() => true)}
                    onMouseLeave={() => setIsHover(() => false)}
                    style={{ color: isHover ? '#00CA87' : '#B4B7C1' }}
                  />
                </Tooltip>
              }
              balance={`${formatNumber(lending.supplyAPY * 100, 2)}%`}
            />

            <DataItem
              title={t('Yearly interest')}
              balance={`${formatNumber(new BN(formatInput).multipliedBy(lending.supplyAPY), 2)} sKCS`}
              uBalance={`≈$${formatNumber(
                new BN(formatInput).multipliedBy(lending.supplyAPY).multipliedBy(skcsPrice).toString(),
                2
              )}`}
            />
            <DataItem
              titleExtra={
                <Tooltip placement="top" title={t('Collateral factor tip')}>
                  <InfoCircleOutlined
                    onMouseEnter={() => setIsHover1(() => true)}
                    onMouseLeave={() => setIsHover1(() => false)}
                    style={{ color: isHover1 ? '#00CA87' : '#B4B7C1' }}
                  />
                </Tooltip>
              }
              title={t('DEFI_23')}
              balance={`${formatNumber(lending.collateralFactor * 100, 2)}%`}
            />
            <DataItem
              title={t('Borrowable value')}
              titleExtra={
                <Tooltip placement="top" title={t('Borrowable value tip')}>
                  <InfoCircleOutlined
                    onMouseEnter={() => setIsHover2(() => true)}
                    onMouseLeave={() => setIsHover2(() => false)}
                    style={{ color: isHover2 ? '#00CA87' : '#B4B7C1' }}
                  />
                </Tooltip>
              }
              balance={`$${formatNumber(
                new BN(formatInput).multipliedBy(lending.collateralFactor).multipliedBy(skcsPrice).toString(),
                2
              )}`}
            />
          </RowCenterBox>
        </DataPanelWarp>
        <StyledButton onClick={() => window.open(lending.supplyUrl, '_blank')}>{t('Supply Now')}</StyledButton>
      </Panel>
    </Warp>
  )
}

export default Calculator
