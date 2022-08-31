import { useWeb3React } from '@web3-react/core'
import BN from 'bignumber.js'
import { Image } from 'components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'state'
import styled from 'styled-components'
import { formatNumber } from '../../utils/bignumber'
import { getPrizeByRank } from '../../utils/skcsWin'
import SKCSWinTitle from './components/SKCSTitle'
import { ActivityType } from './index'
import { LoadingOutlined } from '@ant-design/icons'
import { useResponsive } from '../../utils/responsive'
import { find } from 'lodash'

dayjs.extend(utc)

const ParticipateWrap = styled.div`
  position: relative;
  width: 584px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const DecorateImage = styled.div`
  position: absolute;
  top: 20px;
  right: 5px;
  z-index: 2;
  @media (max-width: 768px) {
    display: none;
  }
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
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 200px;
    background-size: 99% 99%;
    padding: 64px 0px 20px 0px;
  }
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

const TableRow = styled.div<{ isCurrentUser?: boolean; rank?: number }>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  text-align: left;
  align-items: center;
  width: 100%;
  color: #efeff2;
  padding: 0 62px 0 32px;
  & + & {
    padding: 9px 62px 9px 32px;
  }
  margin: ${({ isCurrentUser, rank }) => {
    if (isCurrentUser && rank && rank < 11) {
      return `5px 0px`
    }
    return '0px'
  }};

  background: ${({ isCurrentUser, rank }) => {
    if (isCurrentUser) {
      return `url(${rowBg}) top center no-repeat`
    }
    return ''
  }};

  background-size: ${({ isCurrentUser, rank }) => {
    if (isCurrentUser && rank && rank < 11) {
      return `100% 115%`
    }
    return '100% 100%'
  }};
  @media (max-width: 768px) {
    padding: 0 16px 0 16px;
    & + & {
      padding: 9px 16px 9px 16px;
    }
  }
`

const NoCol = styled.div`
  width: 34px;
  height: 24px;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 30px;
    font-size: 14px;
  }
`

const AddressCol = styled.div`
  width: 99px;
  margin-left: 58px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  text-align: justify;
  @media (max-width: 768px) {
    margin-left: 26px;
    width: 85px;
    font-size: 14px;
  }
`

const AmountCol = styled.div`
  width: 176px;
  margin-left: 40px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  @media (max-width: 768px) {
    margin-left: 27px;
    flex: 1;
    font-size: 14px;
  }
`
const PrizeCol = styled.div`
  width: 41px;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
    width: 32px;
  }
`

const NoData = styled.div`
  color: #fff;
  font-family: 'Arial';
  font-size: 16px;
  margin-top: -100px;
`

const No1 = require('../../assets/images/skcswin/gold.png').default
const No2 = require('../../assets/images/skcswin/sliver.png').default
const No3 = require('../../assets/images/skcswin/bronze.png').default

const prizeIcon = [No1, No2, No3]

const Leaderboard: React.FunctionComponent<{ userActivityData: ActivityType; requested: boolean }> = ({
  userActivityData,
  requested,
}) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { isMobile } = useResponsive()

  const shortAddress = (address: string) => {
    console.log('address', address)
    return `${address.slice(0, 4)}......${address.slice(-4)}`
  }

  const userInTop10 = React.useMemo(() => {
    if (!account) return false
    return find(userActivityData.top10List.list, { address: account })
  }, [userActivityData, account])

  const isEmptyLeaderboard = React.useMemo(() => {
    return requested && userActivityData.top10List.list?.length === 0
  }, [requested, userActivityData])

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
        {!requested && <LoadingOutlined style={{ fontSize: '40px', color: '#A176C5' }} />}
        {isEmptyLeaderboard && <NoData>{t('No ranking data available at this time')}</NoData>}
        {userActivityData.top10List.list.length > 0 && (
          <>
            <UpdateTimeArea>
              {t('sKCSWin.UpdateTime', {
                time: dayjs(userActivityData.top10List.lastUpdate * 1000)
                  .utc()
                  .format('hh:mm, MMM D'),
              })}
              {!isMobile && (
                <>
                  &nbsp;&nbsp;&nbsp;
                  {t('Block Height', { blockHeight: formatNumber(userActivityData.top10List.blockHeight, 0) })}
                </>
              )}
            </UpdateTimeArea>
            <Table>
              <TableRow>
                <NoCol>{t('No')}</NoCol>
                <AddressCol>{t('Address')}</AddressCol>
                <AmountCol>{t('Daily Staking Amount')}</AmountCol>
                <PrizeCol>{t('Prize')}</PrizeCol>
              </TableRow>
              {userActivityData.top10List.list.map((list, i) => {
                return (
                  <TableRow key={i} isCurrentUser={account === list.address} rank={list.rank}>
                    {i < 3 ? (
                      <NoCol>
                        <Image src={prizeIcon[i]} alt="prize-icon" width="24px" height="24px" />
                      </NoCol>
                    ) : (
                      <NoCol>{list.rank}</NoCol>
                    )}
                    <AddressCol>{account === list.address ? t('You') : shortAddress(list.address)}</AddressCol>
                    <AmountCol>{list.amount ? formatNumber(new BN(list.amount).div(10 ** 18), 2) : '-'}</AmountCol>
                    <PrizeCol>{formatNumber(getPrizeByRank(list.rank), 2)}</PrizeCol>
                  </TableRow>
                )
              })}

              {account &&
                userActivityData.registered &&
                Number(userActivityData.stakingAmount) > 1 &&
                userActivityData.top10List.list.length >= 10 &&
                !userInTop10 && (
                  <TableRow isCurrentUser={true} style={{ flex: 1, alignItems: 'stretch', paddingTop: '12px' }}>
                    <NoCol>{userActivityData.rank}</NoCol>
                    <AddressCol>{t('You')}</AddressCol>
                    <AmountCol>
                      {userActivityData.stakingAmount
                        ? formatNumber(new BN(userActivityData.stakingAmount).div(10 ** 18), 2)
                        : '-'}
                    </AmountCol>
                    <PrizeCol>{getPrizeByRank(userActivityData.rank)}</PrizeCol>
                  </TableRow>
                )}
            </Table>
          </>
        )}
      </Content>
    </ParticipateWrap>
  )
}

export default Leaderboard
