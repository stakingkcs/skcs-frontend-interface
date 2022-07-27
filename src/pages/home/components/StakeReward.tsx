import { InfoCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tooltip } from 'antd'
import BN from 'bignumber.js'
import { ColumnCenterBox, RowCenterBox } from 'components'
import DataItem from 'components/DataItem'
import StyledButton from 'components/StyledButton'
import StyledInput from 'components/StyledInput'
import { useStakerContract } from 'hooks/useContract'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useKCSPrice, useStakerState } from 'state/hooks'
import { toggleConnectWalletModalShow } from 'state/wallet/actions'
import { useBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import { formatNumber } from 'utils/bignumber'
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
  const history = useHistory()
  const stakerContract = useStakerContract()
  const kcsPrice = useKCSPrice()
  const dispatch = useDispatch()

  const [isHover, setIsHover] = React.useState<boolean>(false)

  const renderData = React.useCallback(() => {
    if (!isMobile) {
      return (
        <RowCenterBox style={{ width: '100%' }} align="flex-start" justify="space-between">
          <DataItem
            title={t('HOME_38')}
            titleExtra={
              <Tooltip placement="top" title={t('HOME_12')}>
                <InfoCircleOutlined
                  onMouseEnter={() => setIsHover(() => true)}
                  onMouseLeave={() => setIsHover(() => false)}
                  style={{ color: isHover ? '#00CA87' : '#B4B7C1' }}
                />
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
            uBalance={`≈$${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).div(12).multipliedBy(kcsPrice).toString() : 0,
              4
            )}`}
          />
          <DataItem
            title={t('HOME_14')}
            balance={`${formatNumber(inputValue ? new BN(inputValue).multipliedBy(staker.apr).toString() : 0, 4)}KCS`}
            uBalance={`≈$${formatNumber(
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
                <InfoCircleOutlined
                  onMouseEnter={() => setIsHover(() => true)}
                  onMouseLeave={() => setIsHover(() => false)}
                  style={{ color: isHover ? '#00CA87' : '#B4B7C1' }}
                />
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
            uBalance={`≈$${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).div(12).multipliedBy(kcsPrice).toString() : 0,
              4
            )}`}
          />
          <DataItem
            title={t('HOME_14')}
            balance={`${formatNumber(inputValue ? new BN(inputValue).multipliedBy(staker.apr).toString() : 0, 4)}KCS`}
            uBalance={`≈$${formatNumber(
              inputValue ? new BN(inputValue).multipliedBy(staker.apr).multipliedBy(kcsPrice).toString() : 0,
              4
            )}`}
          />
        </ColumnCenterBox>
      )
    }
  }, [inputValue, staker, isHover])

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
            error={{ hasError: false, errorInfo: '' }}
            maxLimit={new BN(balance).div(10 ** 18).toString()}
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
              onClick={() => {
                history.push('/staking')
              }}
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
