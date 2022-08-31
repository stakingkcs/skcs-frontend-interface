import { QuestionCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tabs, Tooltip } from 'antd'
import BN from 'bignumber.js'
import { ALink, FlexBox, GradientBgColor, Image, RowCenterBox } from 'components'
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
import { useTranslation, Trans } from 'react-i18next'
import { CenterBox, BetweenBox } from '../../../components/index'
import { useResponsive } from 'utils/responsive'
import GreenExternalLink from 'components/ExternalLink/GreenExternalLink'
import SmallSKCSWinBanner from 'components/skcsWinBanner/SmallSKCSWinBanner'

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
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 32px 0 24px 0;
  }

  .ant-tabs-ink-bar {
    ${GradientBgColor}
  }

  .ant-tabs-nav-list {
    width: 100%;
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

  @media (max-width: 768px) {
    .ant-tabs-tab {
      width: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px 0 5px 0px;
      margin-left: 10px;
    }
    .ant-tabs-nav-list {
      width: 180px;
      padding-left: 20px;
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

const SubTitle = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #b4b7c1;
`

const StakingPanel: FunctionComponent = () => {
  const { isMobile } = useResponsive()
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
      setDepositKCSGasFee(() => new BigNumber(gasFeeRespond.toString()))
    }

    getGasFee()
  }, [stakerContract, account])

  const maxDepositKCS = React.useMemo(() => {
    if (balance === '') return ZERO
    if (new BN(balance).div(10 ** 18).lt(0.1)) {
      return new BigNumber(balance).sub(depositKCSGasFee)
    }
    return new BigNumber(balance).sub(new BN(0.1).multipliedBy(10 ** 18).toString(10))
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
            message: t('STAKE_1'),
            description: (
              <div>
                {t('STAKE_55', {
                  inputValue: inputValue,
                  totalKSC: formatNumber(new BN(inputValue).multipliedBy(staker.skcsQuetoByKCS.toString()), 3),
                })}
                {/* <ALink
                  href={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                  target="_blank"
                >
                  {t('HOME_9')}
                </ALink> */}
                <GreenExternalLink
                  name={t('HOME_9')}
                  url={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                />
              </div>
            ),
          })
          setInputValue(() => '')
          updateBalance(library, account)
          dispatch(fetchStakersUserDataAsync(account))
        } else {
          StyledNotification.success({
            message: t('STAKE_57'),
            description: t('HOME_11'),
          })
        }
      }
    } catch (e) {
      console.log(e)
      StyledNotification.success({
        message: t('STAKE_57'),
        description: t('HOME_11'),
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
            message: t('HOME_7'),
            description: (
              <div>
                {t('STAKE_61', {
                  inputValue: inputValue,
                  totalsKSC: formatNumber(new BN(staker.kcsQuetoBySKCS).multipliedBy(inputValue), 3),
                })}
                {/* <ALink
                  href={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                  target="_blank"
                >
                  {t('HOME_9')}
                </ALink> */}
                <GreenExternalLink
                  name={t('HOME_9')}
                  url={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                />
              </div>
            ),
          })
          setInputValue(() => '')
          updateBalance(library, account)
          dispatch(fetchStakersUserDataAsync(account))
        } else {
          StyledNotification.success({
            message: t('HOME_10'),
            description: t('STAKE_63'),
          })
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(() => false)
    }
  }, [dispatch, stakerContract, account, library, inputValue])

  // const changePanel = React.useCallback(
  //   (e) => {
  //     console.log('e', e)
  //     console.log(activeKey)
  //     if (e.keyCode === 9) {
  //       changeActiveKey(activeKey === '1' ? '2' : '1')
  //     }
  //   },
  //   [activeKey, changeActiveKey]
  // )

  // React.useEffect(() => {
  //   window.addEventListener('keydown', changePanel)
  //   return () => window.removeEventListener('keydown', changePanel)
  // }, [])

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
                <GradientText style={{ fontSize: '20px', fontWeight: 700 }}>{t('HOME_22')}</GradientText>
              ) : (
                <Text style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>{t('HOME_22')}</Text>
              )
            }
            key="1"
          >
            <ContentWrap>
              <StyledInput
                placeholder={t('COMPONENT_3')}
                inputValue={inputValue}
                setVaule={setInputValue}
                error={error}
                setError={setError}
                maxLimit={new BN(maxDepositKCS.toString()).div(10 ** 18).toString()}
              />

              {isMobile && (
                <>
                  {account && (
                    <BetweenBox style={{ marginTop: '8px' }}>
                      <SubTitle>{t('STAKE_27')}</SubTitle>
                      <SubTitle>{`${formatNumber(new BN(balance).div(10 ** 18), 2)} KCS`}</SubTitle>
                    </BetweenBox>
                  )}

                  <CenterBox style={{ margin: '24px 0' }}>
                    <Image
                      src={require('../../../assets/images/Icons/arrow-down.png').default}
                      width="8px"
                      height="auto"
                      alt="arrow-down-icon"
                    />
                  </CenterBox>
                  <FlexBox style={{ flexFlow: 'column nowrap' }}>
                    <SubTitle style={{ marginBottom: '8px' }}>{t('STAKE_66')}</SubTitle>
                    <StyledInput
                      showMax={false}
                      suffix="sKCS"
                      placeholder={t('COMPONENT_3')}
                      readOnly={true}
                      inputValue={formatNumber(
                        new BN(inputValue === '' ? 0 : inputValue).times(staker.kcsQuetoBySKCS.toString()),
                        4
                      )}
                      setVaule={setInputValue}
                      error={error}
                      setError={setError}
                      maxLimit={'0'}
                    />
                    {account && (
                      <BetweenBox style={{ marginTop: '8px' }}>
                        <SubTitle>{t('STAKE_87')}</SubTitle>
                        <SubTitle>{`${formatNumber(
                          new BN(staker.userData?.stakeAmount.toString() ?? 0).div(10 ** 18),
                          2
                        )} sKCS`}</SubTitle>
                      </BetweenBox>
                    )}
                  </FlexBox>
                </>
              )}

              {!account ? (
                <StyledButton
                  style={{ marginTop: '40px' }}
                  onClick={() => {
                    dispatch(toggleConnectWalletModalShow({ show: true }))
                  }}
                >
                  {t('HOME_21')}
                </StyledButton>
              ) : (
                <StyledButton
                  disabled={!account || !inputValue || error.hasError}
                  style={{ marginTop: '40px' }}
                  loading={loading}
                  onClick={handleDeposit}
                >
                  {t('HOME_22')}
                </StyledButton>
              )}

              <RowData
                style={{ marginTop: '32px' }}
                title={t('STAKE_65')}
                content={`1sKCS = ${formatNumber(staker.skcsQuetoByKCS, 6)}KCS`}
              />
              {isMobile ? (
                <RowData
                  style={{ marginTop: '12px' }}
                  title="APY"
                  content={
                    <Text color="#00D092">{`${formatNumber(
                      new BN(staker.apr.toString()).multipliedBy(100).toString(),
                      2
                    )} %`}</Text>
                  }
                />
              ) : (
                <RowData
                  style={{ marginTop: '12px' }}
                  title={t('STAKE_66')}
                  content={`${formatNumber(
                    new BN(inputValue === '' ? 0 : inputValue).times(staker.kcsQuetoBySKCS.toString()),
                    3
                  )} sKCS`}
                />
              )}

              {/* <RowData
                style={{ marginTop: '12px' }}
                title={
                  <RowCenterBox>
                    <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>{t('STAKE_68')}</Text>
                    <Tooltip placement="top" title={t('STAKE_69')}>
                      <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                    </Tooltip>
                  </RowCenterBox>
                }
                content={`${formatNumber(new BN(staker.rewardFee.toString()).div(100).toString(), 2)}%`}
              /> */}

              {/* {account && <TipsText>{t('STAKE_67')}</TipsText>} */}
              {account && <SmallSKCSWinBanner />}
            </ContentWrap>
          </StyledTabPane>

          {/* ___________________________________ */}

          <StyledTabPane
            tab={
              activeKey === '2' ? (
                <GradientText style={{ fontSize: '20px', fontWeight: 700 }}>{t('STAKE_2')}</GradientText>
              ) : (
                <Text style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>{t('STAKE_2')}</Text>
              )
            }
            key="2"
          >
            <ContentWrap>
              <StyledInput
                inputValue={inputValue}
                setVaule={setInputValue}
                error={error}
                placeholder={t('COMPONENT_3')}
                setError={setError}
                suffix="sKCS"
                maxLimit={new BN(staker.userData.stakeAmount.toString()).div(10 ** 18).toString()}
              />

              {isMobile && (
                <>
                  {account && (
                    <BetweenBox style={{ marginTop: '8px' }}>
                      <SubTitle>{t('STAKE_27')}</SubTitle>
                      <SubTitle>{`${formatNumber(
                        new BN(staker.userData?.stakeAmount.toString() ?? 0).div(10 ** 18),
                        2
                      )} sKCS`}</SubTitle>
                    </BetweenBox>
                  )}
                  <CenterBox style={{ margin: '24px 0' }}>
                    <Image
                      src={require('../../../assets/images/Icons/arrow-down.png').default}
                      width="8px"
                      height="auto"
                      alt="arrow-down-icon"
                    />
                  </CenterBox>
                  <FlexBox style={{ flexFlow: 'column nowrap' }}>
                    <SubTitle style={{ marginBottom: '8px' }}>{t(`STAKE_66`)}</SubTitle>
                    <StyledInput
                      showMax={false}
                      suffix="KCS"
                      style={{ marginTop: '8px' }}
                      readOnly={true}
                      inputValue={formatNumber(
                        new BN(inputValue === '' ? 0 : inputValue).times(staker.skcsQuetoByKCS.toString()),
                        4
                      )}
                      setVaule={setInputValue}
                      error={error}
                      setError={setError}
                      placeholder={t('COMPONENT_3')}
                      maxLimit={'0'}
                    />

                    {account && (
                      <BetweenBox style={{ marginTop: '8px' }}>
                        <SubTitle>{t('STAKE_27')}</SubTitle>
                        <SubTitle>{`${formatNumber(new BN(balance ?? 0).div(10 ** 18), 2)} KCS`}</SubTitle>
                      </BetweenBox>
                    )}
                  </FlexBox>
                </>
              )}

              {!account ? (
                <StyledButton
                  style={{ marginTop: '40px' }}
                  onClick={() => {
                    dispatch(toggleConnectWalletModalShow({ show: true }))
                  }}
                >
                  {t('HOME_21')}
                </StyledButton>
              ) : (
                <StyledButton
                  disabled={!account || !inputValue || error.hasError}
                  style={{ marginTop: '40px' }}
                  loading={unstakeLoading}
                  onClick={handleUnstake}
                >
                  {t('STAKE_2')}
                </StyledButton>
              )}

              <RowData
                style={{ marginTop: '32px' }}
                title={t('STAKE_65')}
                content={`1sKCS = ${formatNumber(staker.skcsQuetoByKCS, 6)}KCS`}
              />

              {isMobile ? (
                <RowData
                  style={{ marginTop: '12px' }}
                  title="APY"
                  content={
                    <Text color="#00D092">{`${formatNumber(
                      new BN(staker.apr.toString()).multipliedBy(100).toString(),
                      2
                    )} %`}</Text>
                  }
                />
              ) : (
                <RowData
                  style={{ marginTop: '12px' }}
                  title={t('STAKE_66')}
                  content={`${formatNumber(
                    new BN(inputValue === '' ? 0 : inputValue).times(staker.skcsQuetoByKCS.toString()),
                    3
                  )} KCS`}
                />
              )}

              {/* <RowData
                style={{ marginTop: '12px' }}
                title={
                  <RowCenterBox>
                    <Text style={{ fontSize: '16px', fontWeight: 400, marginRight: '5px' }}>{t('STAKE_68')}</Text>
                    <Tooltip placement="top" title={t('STAKE_69')}>
                      <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                    </Tooltip>
                  </RowCenterBox>
                }
                content={`%`}
              /> */}

              {account && (
                <TipsText>
                  {t('STAKE_67', { fee: formatNumber(new BN(staker.rewardFee.toString()).div(100).toString(), 2) })}
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
