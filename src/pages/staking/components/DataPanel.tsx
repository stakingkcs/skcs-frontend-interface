import { QuestionCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tooltip } from 'antd'
import BN from 'bignumber.js'
import { ALink, RowCenterBox } from 'components'
import DataItem from 'components/DataItem'
import StyledButton from 'components/StyledButton'
import StyledNotification from 'components/StyledNotification'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { fetchStakersUserDataAsync } from 'state/staker'
import styled from 'styled-components'
import { useResponsive } from 'utils/responsive'
import { updateBalance } from 'utils/wallet'
import ExternalLink from '../../../components/ExternalLink/index'
import { useStakerContract } from '../../../hooks/useContract'
import { useKCSPrice, useSKCSPrice, useStakerState } from '../../../state/hooks'
import { toggleConnectWalletModalShow } from '../../../state/wallet/actions'
import { useBalance } from '../../../state/wallet/hooks'
import { getStakerAddress } from '../../../utils/addressHelpers'
import { formatNumber } from '../../../utils/bignumber'
import { stakerContractHelper } from '../../../utils/validator'
import { addTokenToWallet } from '../../../utils/wallet'

const BannerImage = require('../../../assets/images/staking/banner.png').default

const HeaderPanel = styled.div`
  background: url(${BannerImage}) top center no-repeat;
  background-size: 100% 100%;
  border-radius: 16px;
  width: 100%;
  height: 102px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  padding-left: 36px;
`

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  display: flex;
  align-items: center;
  color: #ffffff;
`

const Desc = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #ffffff;
`
const ContentWrap = styled.div<{ connected: boolean }>`
  margin-top: ${({ connected }) => {
    if (connected) {
      return '0px'
    }
    return '24px'
  }};
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 36px 32px;
  height: ${({ connected }) => {
    if (connected) {
      return '495px'
    }
    return '328px'
  }};
  @media (max-width: 768px) {
    height: auto;
  }
`

const PlusIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const StakingPanel: FunctionComponent = () => {
  const { t } = useTranslation()
  const { isMobile } = useResponsive()
  const [loading, setLoading] = React.useState<boolean>(false)

  const { account, library } = useWeb3React()

  const balance = useBalance()

  const dispatch = useDispatch()

  const staker = useStakerState()

  const kcsPrice = useKCSPrice()
  const skcsPrice = useSKCSPrice()

  const stakerContract = useStakerContract()

  const handleWithdraw = React.useCallback(async () => {
    if (!account) return
    setLoading(() => true)
    try {
      const amount = formatNumber(
        new BN(staker.userData.availableWithdrawKCSAmount.toString()).div(10 ** 18).toString(10),
        3
      )
      const response = await stakerContractHelper.withdrawKCSFromValidator(stakerContract, account)
      if (response.status) {
        console.log('response.data', response.data)
        if (response.data?.status === 1) {
          StyledNotification.success({
            message: t('HOME_4'),
            description: (
              <div>
                {t('Withdraw Notification', {
                  amount: amount,
                })}
                <ALink
                  style={{ marginLeft: '5px' }}
                  href={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                  target="_blank"
                >
                  {t('HOME_9')}
                </ALink>
              </div>
            ),
          })
          updateBalance(library, account)
          dispatch(fetchStakersUserDataAsync(account))
        } else {
          StyledNotification.success({
            message: t('Withdraw failed!'),
            description: t('HOME_11'),
          })
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(() => false)
    }
  }, [dispatch, stakerContract, account, library, staker])

  if (!account && isMobile) return null

  return (
    <>
      {!account && (
        <HeaderPanel>
          <Title>{t('STAKE_6')}</Title>
          <Desc>{t('STAKE_7')}</Desc>
        </HeaderPanel>
      )}
      <ContentWrap connected={Boolean(account)}>
        {!isMobile && (
          <RowCenterBox>
            <DataItem
              title={t('STAKE_8')}
              balance={`${account ? formatNumber(new BN(balance).div(10 ** 18), 2) : '0.00'} KCS`}
              titleExtra={
                <ExternalLink
                  style={{ marginLeft: '10px' }}
                  url="https://app.mojitoswap.finance/swap"
                  name={t('STAKE_9')}
                />
              }
            />
          </RowCenterBox>
        )}

        {!account ? (
          <>
            <RowCenterBox align="flex-start" justify="space-between" style={{ marginTop: '24px', width: '300px' }}>
              <DataItem title={t('STAKE_12')} balance={`0.00 sKCS`} uBalance="≈$0.0000" />
              <DataItem
                title={t('HOME_38')}
                titleExtra={
                  <Tooltip placement="top" title={t('HOME_12')}>
                    <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                  </Tooltip>
                }
                balance={`${formatNumber(staker.apr, 2)}%`}
              />
            </RowCenterBox>
          </>
        ) : (
          <>
            {!isMobile && (
              <RowCenterBox style={{ marginTop: '32px' }}>
                <DataItem
                  title={t('STAKE_12')}
                  balance={`${formatNumber(new BN(staker.userData.stakeAmount.toString()).div(10 ** 18), 2)} sKCS`}
                  uBalance={`≈$${formatNumber(
                    skcsPrice.multipliedBy(new BN(staker.userData.stakeAmount.toString()).div(10 ** 18)),
                    2
                  )}`}
                  balanceExtra={
                    <Tooltip placement="top" title={t('STAKE_13')}>
                      <PlusIcon
                        src={require('../../../assets/images/Icons/plus.png').default}
                        onClick={() => {
                          addTokenToWallet({
                            tokenAddress: getStakerAddress(),
                            decimals: 18,
                            image: 'https://s3.ap-northeast-1.amazonaws.com/static.kcc.io/logo/skcs.png',
                            symbol: 'sKCS',
                          })
                        }}
                        alt="add-token-icon"
                      />
                    </Tooltip>
                  }
                />
              </RowCenterBox>
            )}

            <RowCenterBox align="flex-start" justify="space-between" style={{ marginTop: '32px', width: '300px' }}>
              <DataItem
                title={t('STAKE_14')}
                balance={`${formatNumber(new BN(staker.userData.pendingAmount.toString()).div(10 ** 18), 2)} KCS`}
                uBalance={`≈$${formatNumber(
                  kcsPrice.multipliedBy(new BN(staker.userData.pendingAmount.toString()).div(10 ** 18)),
                  2
                )}`}
                titleExtra={
                  <Tooltip placement="top" title={t('STAKE_15')}>
                    <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                  </Tooltip>
                }
              />
              {!isMobile && (
                <DataItem
                  title={t('HOME_38')}
                  titleExtra={
                    <Tooltip placement="top" title={t('HOME_12')}>
                      <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                    </Tooltip>
                  }
                  balance={`${formatNumber(staker.apr * 100, 2)}%`}
                />
              )}
            </RowCenterBox>

            <RowCenterBox align="center" justify="space-between" style={{ marginTop: '32px', width: '100%' }}>
              <DataItem
                title={t('STAKE_17')}
                balance={`${formatNumber(
                  new BN(staker.userData.availableWithdrawKCSAmount.toString()).div(10 ** 18).toString(10),
                  2
                )} KCS`}
                uBalance={`≈$${formatNumber(
                  kcsPrice.multipliedBy(new BN(staker.userData.availableWithdrawKCSAmount.toString()).div(10 ** 18)),
                  2
                )}`}
              />

              <StyledButton
                loading={loading}
                disabled={!account || staker.userData.availableWithdrawKCSAmount.eq(0)}
                onClick={handleWithdraw}
                style={{ width: '232px' }}
              >
                {t('STAKE_18')}
              </StyledButton>
            </RowCenterBox>
          </>
        )}

        {!account && (
          <StyledButton
            style={{ marginTop: '32px' }}
            onClick={() => {
              dispatch(toggleConnectWalletModalShow({ show: true }))
            }}
          >
            {t('HOME_21')}
          </StyledButton>
        )}
      </ContentWrap>
    </>
  )
}

export default StakingPanel
