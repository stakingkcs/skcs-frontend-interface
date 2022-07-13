import { useWeb3React } from '@web3-react/core'
import StyledInput from 'components/StyledInput'
import React from 'react'
import styled from 'styled-components'
import BN from 'bignumber.js'
import { ColumnCenterBox, RowCenterBox } from 'components'
import { isMobile } from 'react-device-detect'
import DataItem from 'components/DataItem'
import { Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import StyledButton from 'components/StyledButton'
import { useTranslation } from 'react-i18next'

const Warp = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => {
    if (visible) {
      return 'flex'
    }
    return 'none'
  }};
  position: fixed;
  width: 100%;
  height: 100vh;
  inset: 0;
  z-index: 9999999;
  background: rgba(0, 0, 0, 0.2);
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`
const Panel = styled.div`
  width: 600px;
  height: 362px;
  padding: 32px;
  background: #000000;
  border-radius: 16px;
  margin: auto;
  padding: 40px 32px;
  @media (max-width: 768px) {
    width: 327px;
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

export interface CaculatorProps {
    visible: boolean
    toggleVisible?: any
  }
  
const Calculator: React.FunctionComponent<CaculatorProps> = (props) => {
  const { t } = useTranslation()
  const { account, library } = useWeb3React()
  const [inputValue, setInputValue] = React.useState<string>('')
  const [error, setError] = React.useState<{ hasError: boolean; errorInfo: string }>({ hasError: false, errorInfo: '' })
  const renderData = () => {
    if (!isMobile) {
      return (
        <RowCenterBox style={{ width: '100%' }} align="flex-start" justify="space-between">
          <DataItem
            title="APR"
            titleExtra={
              <Tooltip placement="top" title={t('HOME_12')}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            }
            balance={`10.00%`}
          />
          <DataItem title={t("DEFI_22")} balance={`10 sKCS`} uBalance={`≈$0.0026`} />
          <DataItem title={t("DEFI_23")} balance={`10.00%`} />
          <DataItem title={t("DEFI_23")} balance={`$1,600`} />
        </RowCenterBox>
      )
    } else {
      return (
        <ColumnCenterBox style={{ width: '100%', height: '272px' }} justify="space-between" align="flex-start">
          <DataItem
            title="APY"
            titleExtra={
              <Tooltip placement="top" title={t('HOME_12')}>
                <InfoCircleOutlined style={{ color: 'rgba(255, 255, 255, 0.01)' }} />
              </Tooltip>
            }
            balance={`100%`}
          />
          <DataItem title={t('HOME_16')} balance={`222KCS`} uBalance={`22`} />
          <DataItem title={t('HOME_17')} balance={`11`} uBalance={`33`} />
        </ColumnCenterBox>
      )
    }
  }

  return (
    <Warp visible={props.visible}>
      <Panel>
        <PanelText>{t('HOME_20')}</PanelText>
        <StyledInput inputValue={``} setVaule={``} value={``} setError={setError} error={error} maxLimit={``} />
        <DataPanelWarp>{renderData()}</DataPanelWarp>
        {!account ? <StyledButton>{t('HOME_21')}</StyledButton> : <StyledButton>{t('HOME_22')}</StyledButton>}
      </Panel>
    </Warp>
  )
}

export default Calculator
