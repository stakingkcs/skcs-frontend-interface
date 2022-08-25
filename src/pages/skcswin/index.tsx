import React from 'react'
import styled from 'styled-components'
import Banner from './Banner'
import Participate from './Participate'
import PrizePool from './PrizePool'
import { RowBetween } from '../../components/Row/index'
import Leaderboard from './Leaderboard'
import Rules from './Rules'
import { useWeb3React } from '@web3-react/core'
import { AcitivityService } from 'api/activity'

const SKCSWINWrap = styled.div``

const contentBg = require('../../assets/images/skcswin/content-background.png').default

const SKCSWinContentWrap = styled.div`
  width: 100%;
  background: url(${contentBg}) top center no-repeat;
  background-size: 100% 100%;
  padding-bottom: 60px;
`
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Row1 = styled(RowBetween)`
  padding: 44px 0px;
`

const activity = {
  title: 'sKCSWin.Title',
  startTime: '2022-08-10 10:00:00',
  endTime: '2022-08-25 10:00:00',
  rules: {
    title: 'sKCSWin.RulesTitle',
    keyList: [
      'sKCSWin.Rules1',
      'sKCSWin.Rules2',
      'sKCSWin.Rules3',
      'sKCSWin.Rules4',
      'sKCSWin.Rules5',
      'sKCSWin.Rules6',
      'sKCSWin.Rules7',
    ],
  },
  registered: false,
  rank: 0,
  stakingAmount: 0,
  top10List: {
    list: [],
    lastUpdate: new Date(),
    blockHeight: 1000,
  },
  firstPrize: {
    poolPrize: 500,
    perPrize: 500,
    rank: 1,
  },
  secondPrize: {
    poolPrize: 300,
    perPrize: 300,
    rank: 2,
  },
  firthPrize: {
    poolPrize: 200,
    perPrize: 200,
    rank: 3,
  },
  fouthPrize: {
    poolPrize: 400,
    perPrize: 20,
    rank: [4, 23],
  },
  fifth: {
    poolPrize: 600,
    perPrize: 6,
    rank: [24, 123],
  },
}

export type ActivityType = typeof activity

const SKCSWIN: React.FunctionComponent = () => {
  const { account } = useWeb3React()
  const [userActivityData, setuserActivityData] = React.useState<ActivityType>(activity)

  React.useEffect(() => {
    async function queryRegister() {
      if (!account) {
        return
      }
      const hasRegitered = localStorage.getItem(`${account}-registerd`)
      if (hasRegitered) {
        return
      }

      try {
        const response = await AcitivityService.hasRegister(account)

        console.log('response', response)
      } catch (e) {
        console.log(e)
      }
    }

    queryRegister()
  }, [account, setuserActivityData])

  React.useEffect(() => {
    async function getLeaderBoard() {
      try {
        const response = await AcitivityService.leaderBoard(account)

        console.log('response', response)
      } catch (e) {
        console.log(e)
      }
    }

    getLeaderBoard()
  }, [account, setuserActivityData])

  const registerByAccount = React.useCallback(async () => {
    if (!account) return
    try {
      const response = await AcitivityService.register(account)
      console.log('response', response)
    } catch (e) {
      console.log(e)
    }
  }, [account])

  return (
    <SKCSWINWrap>
      <Banner activity={activity} />
      <SKCSWinContentWrap>
        <Content>
          <Row1>
            <Participate userActivityData={userActivityData} registerByAccount={registerByAccount} />
            <PrizePool userActivityData={userActivityData} registerByAccount={registerByAccount} />
          </Row1>
          <Row1>
            <Leaderboard userActivityData={userActivityData} />
            <Rules userActivityData={userActivityData} />
          </Row1>
        </Content>
      </SKCSWinContentWrap>
    </SKCSWINWrap>
  )
}

export default SKCSWIN
