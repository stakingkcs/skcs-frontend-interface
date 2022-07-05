import { QuestionCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tabs, Tooltip } from 'antd'
import BN from 'bignumber.js'
import { ALink, GradientBgColor, RowCenterBox } from 'components'
import RowData from 'components/RowData'
import StyledButton from 'components/StyledButton'
import StyledInput from 'components/StyledInput'
import StyledNotification from 'components/StyledNotification'
import Text, { GradientText } from 'components/Text'
import { ZERO } from 'constants/number'
import { BigNumber } from 'ethers/utils'
import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { fetchStakersUserDataAsync } from 'state/staker'
import { toggleConnectWalletModalShow } from 'state/wallet/actions'
import styled from 'styled-components'
import { updateBalance } from 'utils/wallet'
import { useStakerContract } from '../../../hooks/useContract'
import { useStakerState } from '../../../state/hooks'
import { useBalance } from '../../../state/wallet/hooks'
import { formatNumber } from '../../../utils/bignumber'
import { stakerContractHelper } from '../../../utils/validator'
import DataPanel from './DataPanel'
import { useTranslation } from 'react-i18next'

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
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: center;
    height: auto;
    padding: 0 16px;
  }
`

const DataPanelWrap = styled.div`
  width: 568px;
  height: 100%;
  order: 0;
  @media (max-width: 768px) {
    width: 100%;
    order: 1;
    margin-top: 12px;
  }
`
const StakePanel = styled.div`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  width: 600px;
  height: 100%;
  order: 1;
  @media (max-width: 768px) {
    width: 100%;
    order: 0;
  }
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
  const { t } = useTranslation()
  const balance = useBalance()
  const staker = useStakerState()
  const { account, library } = useWeb3React()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [unstakeLoading, setUnstakeLoading] = React.useState<boolean>(false)
  const stakerContract = useStakerContract()

  const dispatch = useDispatch()

  const [inputValue, setInputValue] = React.useState<string>('')
  const [error, setError] = React.useState<{ hasError: boolean; errorInfo: string }>({ hasError: false, errorInfo: '' })

  const [activeKey, setActiveKey] = React.useState<string>('1')
  const [depositKCSGasFee, setDepositKCSGasFee] = React.useState<BigNumber>(ZERO)

  const changeActiveKey = (key: string) => {
    setActiveKey(() => key)
  }

  React.useEffect(() => {
    setInputValue(() => '')
  }, [activeKey])

  React.useEffect(() => {
    async function getGasFee() {
      if (!account) return 0
      const gasFeeRespond = await stakerContract.estimateGas.depositKCS(account, {
        value: new BigNumber(100).mul(10).toString(),
      })
      console.log('gasFee', gasFeeRespond)
      setDepositKCSGasFee(() => new BigNumber(gasFeeRespond.toString()))
    }

    getGasFee()
  }, [stakerContract, account])

  const maxDepositKCS = React.useMemo(() => {
    if (balance === '') return ZERO
    return new BigNumber(balance).sub(depositKCSGasFee)
  }, [depositKCSGasFee, balance])

  const handleUnstake = React.useCallback(async () => {
    if (!account) return
    setUnstakeLoading(() => true)
    try {
      console.log('inputvalue', inputValue)
      const response = await stakerContractHelper.requestRedemption(
        stakerContract,
        new BN(inputValue).times(10 ** 18),
        account
      )
      if (response.status) {
        console.log('response.data', response.data)
        if (response.data?.status === 1) {
          StyledNotification.success({
            message: 'Unstaking confirmed!',
            description: (
              <div>
                Unstake {inputValue} sKCS and receive{' '}
                {formatNumber(new BN(inputValue).multipliedBy(staker.skcsQuetoByKCS.toString()), 3)} KCS.{' '}
                <ALink
                  href={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                  target="_blank"
                >
                  View transaction on chain.
                </ALink>
              </div>
            ),
          })
          setInputValue(() => '')
          updateBalance(library, account)
          dispatch(fetchStakersUserDataAsync(account))
        } else {
          StyledNotification.success({
            message: 'Unstaking failed!',
            description: 'Please try again.',
          })
        }
      }
    } catch (e) {
      console.log(e)
      StyledNotification.success({
        message: 'Unstaking failed!',
        description: 'Please try again.',
      })
    } finally {
      setUnstakeLoading(() => false)
    }
  }, [dispatch, stakerContract, account, library, inputValue])

  const handleDeposit = React.useCallback(async () => {
    if (!account) return
    setLoading(() => true)
    try {
      console.log('inputvalue', inputValue)
      const response = await stakerContractHelper.depositKCSToValidator(
        stakerContract,
        new BN(inputValue).times(10 ** 18),
        account
      )
      if (response.status) {
        console.log('response.data', response.data)

        if (response.data?.status === 1) {
          StyledNotification.success({
            message: 'Staking confirmed!',
            description: (
              <div>
                Stake {inputValue} KCS and receive{' '}
                {formatNumber(new BN(staker.kcsQuetoBySKCS).multipliedBy(inputValue), 3)} sKCS.{' '}
                <ALink
                  href={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                  target="_blank"
                >
                  View transaction on chain.
                </ALink>
              </div>
            ),
          })
          setInputValue(() => '')
          updateBalance(library, account)
          dispatch(fetchStakersUserDataAsync(account))
        } else {
          StyledNotification.success({
            message: 'Staking failed!',
            description: 'Please try again.',
          })
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(() => false)
    }
  }, [dispatch, stakerContract, account, library, inputValue])

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
                inputValue={inputValue}
                setVaule={setInputValue}
                error={error}
                setError={setError}
                maxLimit={new BN(maxDepositKCS.toString()).div(10 ** 18).toString()}
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
                <StyledButton
                  disabled={!account || !inputValue || error.hasError}
                  style={{ marginTop: '40px' }}
                  loading={loading}
                  onClick={handleDeposit}
                >
                  Stake
                </StyledButton>
              )}

              <RowData
                style={{ marginTop: '32px' }}
                title="Exchange rate"
                content={`1sKCS = ${formatNumber(staker.skcsQuetoByKCS, 4)}KCS`}
              />
              <RowData
                style={{ marginTop: '12px' }}
                title="You will receive"
                content={`${formatNumber(
                  new BN(inputValue === '' ? 0 : inputValue).times(staker.kcsQuetoBySKCS.toString()),
                  3
                )} sKCS`}
              />
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
                content={`${formatNumber(new BN(staker.rewardFee.toString()).div(10000).toString(), 2)}%`}
              />

              {account && (
                <TipsText>
                  Default sKCS unstaking period takes around 3-6 days to process, you can withdraw it after that.
                </TipsText>
              )}
            </ContentWrap>
          </StyledTabPane>

          {/* ___________________________________ */}

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
            <ContentWrap>
              <StyledInput
                inputValue={inputValue}
                setVaule={setInputValue}
                error={error}
                setError={setError}
                suffix="sKCS"
                maxLimit={new BN(staker.userData.stakeAmount.toString()).div(10 ** 18).toString()}
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
                <StyledButton
                  disabled={!account || !inputValue || error.hasError}
                  style={{ marginTop: '40px' }}
                  loading={unstakeLoading}
                  onClick={handleUnstake}
                >
                  Unstake
                </StyledButton>
              )}

              <RowData
                style={{ marginTop: '32px' }}
                title="Exchange rate"
                content={`1sKCS = ${formatNumber(staker.skcsQuetoByKCS, 4)}KCS`}
              />
              <RowData
                style={{ marginTop: '12px' }}
                title="You will receive"
                content={`${formatNumber(
                  new BN(inputValue === '' ? 0 : inputValue).times(staker.skcsQuetoByKCS.toString()),
                  3
                )} KCS`}
              />
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
                content={`${formatNumber(new BN(staker.rewardFee.toString()).div(10000).toString(), 2)}%`}
              />

              {account && (
                <TipsText>
                  Default sKCS unstaking period takes around 3-6 days to process, you can withdraw it after that.
                </TipsText>
              )}
            </ContentWrap>
          </StyledTabPane>
        </StyledTabs>
      </StakePanel>
    </StakingPanelWrap>
  )
}

export default StakingPanel
