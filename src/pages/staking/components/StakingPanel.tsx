import { QuestionCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tabs, Tooltip } from 'antd'
import { GradientBgColor, RowCenterBox } from 'components'
import RowData from 'components/RowData'
import StyledButton from 'components/StyledButton'
import StyledInput from 'components/StyledInput'
import Text, { GradientText } from 'components/Text'
import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow } from 'state/wallet/actions'
import styled from 'styled-components'
import { useBalance } from '../../../state/wallet/hooks'
import DataPanel from './DataPanel'

const { TabPane } = Tabs

const StakingPanelWrap = styled.div<{ connected: boolean }>`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: ${({ connected }) => {
    if (connected) {
      return '495px'
    }
    return '454px'
  }};
`

const DataPanelWrap = styled.div`
  width: 568px;
  height: 100%;
`
const StakePanel = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  width: 600px;
  height: 100%;
`

const StyledTabPane = styled(TabPane)`
  .ant-tabs-ink-bar {
    ${GradientBgColor}
  }
`
const ContentWrap = styled.div`
  padding: 34px 32px;
  width: 100%;
`

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 0 24px 0;
  }

  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-ink-bar {
    ${GradientBgColor}
  }
  .ant-tabs-nav {
    &:before {
      position: absolute;
      right: 0;
      left: 0;
      border-bottom: none !important;
      content: '';
    }
  }
`

const TipsText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #7f8393;
  margin-top: 16px;
`

const StakingPanel: FunctionComponent = () => {
  const balance = useBalance()
  const { account } = useWeb3React()

  const dispatch = useDispatch()

  const [inputValue, setInputValue] = React.useState<string>('')
  const [error, setError] = React.useState<{ hasError: boolean; errorInfo: string }>({ hasError: false, errorInfo: '' })

  const [activeKey, setActiveKey] = React.useState<string>('1')

  const changeActiveKey = (key: string) => {
    setActiveKey(() => key)
  }

  return (
    <StakingPanelWrap connected={Boolean(account)}>
      <DataPanelWrap>
        <DataPanel />
      </DataPanelWrap>
      <StakePanel>
        <StyledTabs defaultActiveKey="1" style={{ width: '100%' }} onChange={changeActiveKey}>
          <StyledTabPane
            tab={
              activeKey === '1' ? (
                <GradientText style={{ fontSize: '20px', fontWeight: 700 }}>Stake</GradientText>
              ) : (
                <Text style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>Stake</Text>
              )
            }
            key="1"
          >
            <ContentWrap>
              <StyledInput
                setVaule={setInputValue}
                value={inputValue}
                error={error}
                setError={setError}
                maxLimit={'12'}
              />
              {!account ? (
                <StyledButton
                  style={{ marginTop: '40px' }}
                  onClick={() => {
                    dispatch(toggleConnectWalletModalShow({ show: true }))
                  }}
                >
                  Connect Wallet
                </StyledButton>
              ) : (
                <StyledButton style={{ marginTop: '40px' }}>Stake</StyledButton>
              )}

              <RowData style={{ marginTop: '32px' }} title="Exchange rate" content="1KCS = 1.5KCS" />
              <RowData style={{ marginTop: '12px' }} title="You will receive" content="s sKCS" />
              <RowData
                style={{ marginTop: '12px' }}
                title={
                  <RowCenterBox>
                    <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>Rewards fee</Text>
                    <Tooltip
                      placement="top"
                      title="This fee applies to staking rewards only, and is NOT taken from your staked amount, it is a fee on earnings only."
                    >
                      <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                    </Tooltip>
                  </RowCenterBox>
                }
                content="10%"
              />

              {account && (
                <TipsText>
                  Default stKCS unstaking period takes around 3-6 days to process, you can withdraw it after that.
                </TipsText>
              )}
            </ContentWrap>
          </StyledTabPane>
          <StyledTabPane
            tab={
              activeKey === '2' ? (
                <GradientText style={{ fontSize: '20px', fontWeight: 700 }}>Unstake</GradientText>
              ) : (
                <Text style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>Unstake</Text>
              )
            }
            key="2"
          >
            Content of Tab Pane 2
          </StyledTabPane>
        </StyledTabs>
      </StakePanel>
    </StakingPanelWrap>
  )
}

export default StakingPanel
