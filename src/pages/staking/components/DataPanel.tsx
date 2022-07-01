import { QuestionCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tooltip } from 'antd'
import BN from 'bignumber.js'
import { ALink, RowCenterBox } from 'components'
import DataItem from 'components/DataItem'
import StyledButton from 'components/StyledButton'
import StyledNotification from 'components/StyledNotification'
import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { fetchStakersUserDataAsync } from 'state/staker'
import styled from 'styled-components'
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
`

const PlusIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const StakingPanel: FunctionComponent = () => {
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
      const response = await stakerContractHelper.withdrawKCSFromValidator(stakerContract, account)
      if (response.status) {
        console.log('response.data', response.data)
        if (response.data?.status === 1) {
          StyledNotification.success({
            message: `Unstaking confirmed!`,
            description: (
              <div>
                Unstake
                {formatNumber(new BN(staker.userData.availableBurnSKCSAmount.toString()).div(10 ** 18).toString(10), 3)}
                sKCS and receive{' '}
                {formatNumber(
                  new BN(staker.userData.availableWithdrawKCSAmount.toString()).div(10 ** 18).toString(10),
                  3
                )}{' '}
                KCS.{' '}
                <ALink
                  href={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                  target="_blank"
                >
                  View transaction on chain.
                </ALink>
              </div>
            ),
          })
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
  }, [dispatch, stakerContract, account, library])

  return (
    <>
      {!account && (
        <HeaderPanel>
          <Title>Stake KCS</Title>
          <Desc>Stake KCS and receive sKCS as proof while staking</Desc>
        </HeaderPanel>
      )}
      <ContentWrap connected={Boolean(account)}>
        <RowCenterBox>
          <DataItem
            title="Available to stake"
            balance={`${account ? formatNumber(new BN(balance).div(10 ** 18), 2) : '0.00'} KCS`}
            titleExtra={
              <ExternalLink
                style={{ marginLeft: '10px' }}
                url="https://app.mojitoswap.finance/swap"
                name="Get more KCS"
              />
            }
          />
        </RowCenterBox>
        {!account ? (
          <>
            <RowCenterBox align="flex-start" justify="space-between" style={{ marginTop: '24px', width: '300px' }}>
              <DataItem title="Staked amount" balance={`0.00 sKCS`} uBalance="≈$0.0000" />
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
                balance={`${formatNumber(staker.apr, 2)}%`}
              />
            </RowCenterBox>
          </>
        ) : (
          <>
            <RowCenterBox style={{ marginTop: '32px' }}>
              <DataItem
                title="Staked amount"
                balance={`${formatNumber(new BN(staker.userData.stakeAmount.toString()).div(10 ** 18), 2)} sKCS`}
                uBalance={`≈$${formatNumber(
                  skcsPrice.multipliedBy(new BN(staker.userData.stakeAmount.toString()).div(10 ** 18)),
                  2
                )}`}
                balanceExtra={
                  <Tooltip placement="top" title="Add token to wallet">
                    <PlusIcon
                      src={require('../../../assets/images/Icons/plus.png').default}
                      onClick={() => {
                        addTokenToWallet({
                          tokenAddress: getStakerAddress(),
                          decimals: 18,
                          image: 'https://s3.ap-northeast-1.amazonaws.com/static.kcc.io/logo/skcs.png',
                          symbol: 'SKCS',
                        })
                      }}
                      alt="add-token-icon"
                    />
                  </Tooltip>
                }
              />
            </RowCenterBox>
            <RowCenterBox align="flex-start" justify="space-between" style={{ marginTop: '32px', width: '300px' }}>
              <DataItem
                title="Pending amount"
                balance={`${formatNumber(new BN(staker.userData.pendingAmount.toString()).div(10 ** 18), 2)} KCS`}
                uBalance={`≈$${formatNumber(
                  kcsPrice.multipliedBy(new BN(staker.userData.pendingAmount.toString()).div(10 ** 18)),
                  2
                )}`}
                titleExtra={
                  <Tooltip
                    placement="top"
                    title="Pending amount means the sKCS unstaking is under processing, the period takes around 3-6 days to process, you can withdraw it after that."
                  >
                    <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                  </Tooltip>
                }
              />
              <DataItem
                title="APR"
                titleExtra={
                  <Tooltip
                    placement="top"
                    title="APR is denominated in terms of sKCS, not USD. The calculation is based on the sKCS/KCS exchange rate 2 days ago, it is not compounded and is not a guaranteed or promised return or profit. APR = (exchange price 48 hours ago - exchange price at this time)*180*100%"
                  >
                    <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                  </Tooltip>
                }
                balance={`${formatNumber(staker.apr * 100, 2)}%`}
              />
            </RowCenterBox>

            <RowCenterBox align="center" justify="space-between" style={{ marginTop: '32px', width: '100%' }}>
              <DataItem
                title="Available withdraw amount"
                balance={`${formatNumber(
                  new BN(staker.userData.availableWithdrawKCSAmount.toString()).div(10 ** 18).toString(10),
                  2
                )} KCS`}
                uBalance={`≈${formatNumber(
                  kcsPrice.multipliedBy(new BN(staker.userData.availableWithdrawKCSAmount.toString()).div(10 ** 18)),
                  4
                )}`}
              />
              <StyledButton
                loading={loading}
                disabled={!account || staker.userData.availableWithdrawKCSAmount.eq(0)}
                onClick={handleWithdraw}
                style={{ width: '232px' }}
              >
                Withdraw
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
            Connect Wallet
          </StyledButton>
        )}
      </ContentWrap>
    </>
  )
}

export default StakingPanel
