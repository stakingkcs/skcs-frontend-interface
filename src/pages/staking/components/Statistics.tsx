import { Collapse, Space } from 'antd'
import DataItem from 'components/DataItem'
import RowData from 'components/RowData'
import React from 'react'
import styled from 'styled-components'
import { Image, RowCenterBox } from '../../../components/index'
import { useResponsive } from '../../../utils/responsive'
import ExternalLink from '../../../components/ExternalLink/index'
import { formatNumber } from '../../../utils/bignumber'
import { useStakerState, useKCSPrice } from '../../../state/hooks'
import BN from 'bignumber.js'

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

const DataRowWrap = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  margin-top: 24px;
  padding: 32px;
`

const Statistics: React.FunctionComponent = () => {
  const staker = useStakerState()
  const kcsPrice = useKCSPrice()
  return (
    <StepsWrap>
      <Content>
        <RowCenterBox justify="space-between">
          <Title>Statistics</Title>
        </RowCenterBox>
        <DataRowWrap>
          <RowData title="APR" content="3.5%" />
          <RowData
            style={{ marginTop: '12px' }}
            title="Total staked amount"
            content={`${formatNumber(new BN(staker.totalStakeKCSAmount.toString()).div(10 ** 18), 3)} KCS`}
          />
          <RowData
            style={{ marginTop: '12px' }}
            title="Stakers"
            content={formatNumber(staker.totalStaker.toNumber(), 0)}
          />
          <RowData
            style={{ marginTop: '12px' }}
            title="stKCS market cap"
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
          <ExternalLink style={{ marginTop: '20px' }} url="" name="View on KCC Explorer" />
        </DataRowWrap>
      </Content>
    </StepsWrap>
  )
}

export default Statistics
