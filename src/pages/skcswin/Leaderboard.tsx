import { useWeb3React } from '@web3-react/core'
import { Image, RowCenterBox } from 'components'
import { RowBetween } from 'components/Row'
import StyledButton from 'components/StyledButton'
import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useAppDispatch } from 'state'
import { toggleConnectWalletModalShow } from 'state/wallet/actions'
import styled from 'styled-components'
import { formatNumber } from '../../utils/bignumber'
import SKCSWinTitle from './components/SKCSTitle'
import { ActivityType } from './index'
import dayjs from 'dayjs'

const ParticipateWrap = styled.div`
  position: relative;
  width: 584px;
`

const DecorateImage = styled.div`
  position: absolute;
  top: 20px;
  right: 5px;
`

const row1Bg = require('../../assets/images/skcswin/row-one-bg.png').default

const Content = styled.div`
  box-sizing: border-box;
  width: 584px;
  height: 574px;
  background: url(${row1Bg}) top center no-repeat;
  background-size: 100% 100%;
  border-radius: 12px;
  margin-top: 27px;
  padding: 64px 0px 0px 0px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`

const UpdateTimeArea = styled.div`
  position: absolute;
  height: 32px;
  top: 0;
  left: 0;
  background: #00d09240;
  color: #efeff2;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 20px;
`

const Table = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const rowBg = require('../../assets/images/skcswin/row-bg.png').default

const TableRow = styled.div<{ isCurrentUser?: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #efeff2;
  padding: 0 62px 0 32px;
  & + & {
    padding: 9px 62px 9px 32px;
  }

  background: ${({ isCurrentUser }) => {
    if (isCurrentUser) {
      return `url(${rowBg}) top center no-repeat`
    }
    return ''
  }};
  background-size: 100% 100%;
`

const NoCol = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AddressCol = styled.div`
  width: 99px;
  margin-left: 64px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`

const AmountCol = styled.div`
  width: 166px;
  margin-left: 40px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`
const PrizeCol = styled.div`
  width: 41px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
`

const No1 = require('../../assets/images/skcswin/gold.png').default
const No2 = require('../../assets/images/skcswin/sliver.png').default
const No3 = require('../../assets/images/skcswin/bronze.png').default

const prizeIcon = [No1, No2, No3]

const Leaderboard: React.FunctionComponent<{ userActivityData: ActivityType }> = ({ userActivityData }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return (
    <ParticipateWrap>
      <DecorateImage>
        <Image
          src={require('../../assets/images/skcswin/decorate-3.png').default}
          width="96px"
          height="96px"
          alt="decorate-img"
        />
      </DecorateImage>
      <SKCSWinTitle title={t('Staking Leaderboard')} />
      <Content>
        <UpdateTimeArea>
          {t('sKCSWin.UpdateTime', { time: dayjs(userActivityData.top10List.lastUpdate).format('hh:mm, MMM') })}
          &nbsp;&nbsp;&nbsp;
          {t('Block Height', { blockHeight: formatNumber(userActivityData.top10List.blockHeight, 0) })}
        </UpdateTimeArea>
        <Table>
          <TableRow>
            <NoCol>{t('No')}</NoCol>
            <AddressCol>{t('Address')}</AddressCol>
            <AmountCol>{t('Daily Staking Amount')}</AmountCol>
            <PrizeCol>{t('Prize')}</PrizeCol>
          </TableRow>
          {new Array(10).fill(0).map((n, i) => {
            return (
              <TableRow key={i}>
                {i < 3 ? (
                  <NoCol>
                    <Image src={prizeIcon[i]} alt="prize-icon" width="24px" height="24px" />
                  </NoCol>
                ) : (
                  <NoCol>{i + 1}</NoCol>
                )}
                <AddressCol>0x12......26sd</AddressCol>
                <AmountCol>100</AmountCol>
                <PrizeCol>200</PrizeCol>
              </TableRow>
            )
          })}
          <TableRow isCurrentUser={true} style={{ flex: 1, alignItems: 'stretch', paddingTop: '12px' }}>
            <NoCol>{userActivityData.rank}</NoCol>
            <AddressCol>{t('You')}</AddressCol>
            <AmountCol>100</AmountCol>
            <PrizeCol>200</PrizeCol>
          </TableRow>
        </Table>
      </Content>
    </ParticipateWrap>
  )
}

export default Leaderboard
