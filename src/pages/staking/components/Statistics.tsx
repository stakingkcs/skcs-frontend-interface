import { Collapse } from 'antd'
import BN from 'bignumber.js'
import RowData from 'components/RowData'
import React from 'react'
import styled from 'styled-components'
import ExternalLink from '../../../components/ExternalLink/index'
import { CenterBox, RowCenterBox } from '../../../components/index'
import { useKCSPrice, useStakerState } from '../../../state/hooks'
import { formatNumber } from '../../../utils/bignumber'
import { useResponsive } from '../../../utils/responsive'
import { useTranslation } from 'react-i18next'
import { getStakerAddress } from '../../../utils/addressHelpers'
import { useBlockNumber } from '../../../state/application/hooks'
import axios from 'axios'

const { Panel } = Collapse

const StepsWrap = styled.div`
  width: 100%;
  height: auto;

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 28px;
  text-align: left;
  color: #ffffff;
  @media (max-width: 768px) {
    text-align: center;
    margin-top: 40px;
    width: 100%;
  }
`

const PanelHeader = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  user-select: none;
  padding-left: 0px;
  width: 100%;
`

const StatisticsP = styled.div`
  line-height: 1.4;
  &:not(:first-child) {
    margin-top: 5px;
  }
`
const MoreLink = styled.a`
  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`

const DividerLine = styled.div`
  background: rgba(255, 255, 255, 0.16);
  height: 1px;
  width: 100%;
  margin: 24px 0 0 0;
`

const DataRowWrap = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  margin-top: 28px;
  padding: 32px;
  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`

const Statistics: React.FunctionComponent = () => {
  const staker = useStakerState()
  const kcsPrice = useKCSPrice()
  const { isMobile } = useResponsive()
  const { t } = useTranslation()

  const [holders, setHolders] = React.useState<number>(0)

  const blockNumber = useBlockNumber()

  React.useEffect(() => {
    async function getSKCSHolder() {
      if (holders === 0 && blockNumber) {
        try {
          const { data } = await axios({
            url: `https://campain.skcs.io/api/v1/info/holders?height=${blockNumber}`,
          })
          if (data.code === 0) {
            const response = data.data?.total_unique
            setHolders(() => response)
            console.log('blockNumber', response)
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
    getSKCSHolder()
  }, [blockNumber, holders])

  return (
    <StepsWrap>
      <Content>
        <RowCenterBox justify="space-between">
          <Title>{t('STAKE_35')}</Title>
        </RowCenterBox>
        <DataRowWrap>
          <RowData title={t('HOME_38')} content={`${formatNumber(staker.apr * 100, 2)}%`} />
          <RowData
            style={{ marginTop: '12px' }}
            title={t('STAKE_36')}
            content={`${formatNumber(new BN(staker.totalStakeKCSAmount.toString()).div(10 ** 18), 3)} KCS`}
          />
          <RowData style={{ marginTop: '12px' }} title={t('STAKE_37')} content={formatNumber(holders, 0)} />
          <RowData
            style={{ marginTop: '12px' }}
            title={t('STAKE_38')}
            content={`$ ${formatNumber(
              kcsPrice.times(
                new BN(staker.totalStakeSKCSAmount.toString())
                  .div(10 ** 18)
                  .times(staker.skcsQuetoByKCS.toString())
                  .toString()
              ),
              3
            )}`}
          />
          {isMobile && <DividerLine />}
          <CenterBox style={{ alignItems: isMobile ? 'center' : 'flex-start' }}>
            <ExternalLink
              style={{ marginTop: '20px' }}
              url={`${process.env.REACT_APP_KCC_EXPLORER}/address/${getStakerAddress()}`}
              name={t('View on KCC Explorer')}
            />
          </CenterBox>
        </DataRowWrap>
      </Content>
    </StepsWrap>
  )
}

export default Statistics
