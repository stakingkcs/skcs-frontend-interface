import { InfoCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tooltip } from 'antd'
import BN from 'bignumber.js'
import { ALink, ColumnCenterBox, RowCenterBox } from 'components'
import DataItem from 'components/DataItem'
import StyledButton from 'components/StyledButton'
import StyledInput from 'components/StyledInput'
import StyledNotification from 'components/StyledNotification'
import { ZERO } from 'constants/number'
import { BigNumber } from 'ethers/utils'
import { useStakerContract } from 'hooks/useContract'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useKCSPrice, useStakerState } from 'state/hooks'
import { fetchStakersUserDataAsync } from 'state/staker'
import { toggleConnectWalletModalShow } from 'state/wallet/actions'
import { useBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import { formatNumber } from 'utils/bignumber'
import { stakerContractHelper } from 'utils/validator'
import { updateBalance } from 'utils/wallet'
const bg = require('../../../assets/images/home/bgground.jpg').default
const mbg = require('../../../assets/images/home/m-re-bg.png').default

const StakeWarp = styled.div`
  height: 995px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: url(${bg}) no-repeat center;
  &:after {
    width: 120px;
    height: 10px;
    background: red;
    border: 1px dashed #ffffff;
    margin: 0 25px;
  }
`
const Title = styled.h2`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  color: #ffffff;
  margin: 129px 0 0 0;
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 0 8px;
  }
`
const Desc = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  color: rgba(180, 183, 193, 1);
  margin-top: 10px;
  max-width: 900px;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    width: 90%;
  }
`
const ButtonWarp = styled.div``

const Panel = styled.div`
  width: 540px;
  height: 380px;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.5);
  margin: 70px 0 0 0;
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

const StakeReward: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const [inputValue, setInputValue] = React.useState<string>('')
  const [error, setError] = React.useState<{ hasError: boolean; errorInfo: string }>({ hasError: false, errorInfo: '' })
  const balance = useBalance()
  const staker = useStakerState()
  const { account, library } = useWeb3React()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [depositKCSGasFee, setDepositKCSGasFee] = React.useState<BigNumber>(ZERO)
  const stakerContract = useStakerContract()
  const kcsPrice = useKCSPrice()
  const dispatch = useDispatch()
  const maxDepositKCS = React.useMemo(() => {
    if (balance === '') return ZERO
    return new BigNumber(balance).sub(depositKCSGasFee)
  }, [depositKCSGasFee, balance])

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
                {t('HOME_8', {
                  inputValue: inputValue,
                  skcsAmount: formatNumber(new BN(staker.kcsQuetoBySKCS).multipliedBy(inputValue), 3),
                })}
                <ALink
                  href={`${process.env.REACT_APP_KCC_EXPLORER}/tx/${response.data.transactionHash}`}
                  target="_blank"
                >
                  {t('HOME_9')}
                </ALink>
              </div>
            ),
          })
          setInputValue(() => '')
          updateBalance(library, account)
          dispatch(fetchStakersUserDataAsync(account))
        } else {
          StyledNotification.success({
            message: t('HOME_10'),
            description: t('HOME_11'),
          })
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(() => false)
    }
  }, [dispatch, stakerContract, account, library, inputValue, setInputValue])

  const renderData = () => {
    if (!isMobile) {
      return (
        <RowCenterBox style={{ width: '100%' }} align="flex-start" justify="space-between">
          <DataItem
            title={t('HOME_38')}
            titleExtra={
              <Tooltip placement="top" title={t('HOME_12')}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            }
            balance={`${formatNumber(staker.apr * 100, 2)}%`}
          />
          <DataItem
            title={t('HOME_13')}
            balance={`${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).div(12).toString() : 0,
              4
            )}KCS`}
            uBalance={`≈${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).div(12).multipliedBy(kcsPrice).toString() : 0,
              4
            )}`}
          />
          <DataItem
            title={t('HOME_14')}
            balance={`${formatNumber(inputValue ? new BN(inputValue).multipliedBy(staker.apr).toString() : 0, 4)}KCS`}
            uBalance={`≈${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).multipliedBy(kcsPrice).toString() : 0,
              4
            )}`}
          />
        </RowCenterBox>
      )
    } else {
      return (
        <ColumnCenterBox style={{ width: '100%', height: '272px' }} justify="space-between" align="flex-start">
          <DataItem
            title={t('HOME_38')}
            titleExtra={
              <Tooltip placement="top" title={t('HOME_12')}>
                <InfoCircleOutlined style={{ color: '#B4B7C1' }} />
              </Tooltip>
            }
            balance={`${formatNumber(staker.apr, 2)}%`}
          />
          <DataItem
            title={t('HOME_13')}
            balance={`${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).div(12).toString() : 0,
              4
            )}KCS`}
            uBalance={`≈${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).div(12).multipliedBy(kcsPrice).toString() : 0,
              4
            )}`}
          />
          <DataItem
            title={t('HOME_14')}
            balance={`${formatNumber(inputValue ? new BN(inputValue).multipliedBy(staker.apr).toString() : 0, 4)}KCS`}
            uBalance={`≈${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).multipliedBy(kcsPrice).toString() : 0,
              4
            )}`}
          />
        </ColumnCenterBox>
      )
    }
  }

  return (
    <>
      <StakeWarp>
        <Title>{t('HOME_18')}</Title>
        <Desc>{t('HOME_19')}</Desc>
        <Panel>
          <PanelText>{t('HOME_20')}</PanelText>
          <StyledInput
            inputValue={inputValue}
            setVaule={setInputValue}
            value={inputValue}
            setError={setError}
            error={error}
            maxLimit={new BN(maxDepositKCS.toString()).div(10 ** 18).toString()}
          />
          <DataPanelWarp>{renderData()}</DataPanelWarp>
          {!account ? (
            <StyledButton
              onClick={() => {
                dispatch(toggleConnectWalletModalShow({ show: true }))
              }}
            >
              {t('HOME_21')}
            </StyledButton>
          ) : (
            <StyledButton
              disabled={!account || !inputValue || error.hasError}
              loading={loading}
              onClick={handleDeposit}
            >
              {t('HOME_22')}
            </StyledButton>
          )}
        </Panel>
      </StakeWarp>
    </>
  )
}

export default StakeReward
