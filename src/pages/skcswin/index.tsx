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
import StyledNotification from 'components/StyledNotification'
import { useTranslation } from 'react-i18next'
import { useResponsive } from 'utils/responsive'

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
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 44px 12px 20px 12px;
  }
`

const activity = {
  title: 'sKCSWin.Title',
  startTime: '2022-08-20 10:00:00',
  endTime: '2022-08-31 10:00:00',
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
  stakingAmount: '0',
  top10List: {
    list: [] as any[],
    lastUpdate: new Date().getTime(),
    blockHeight: 0,
  },
}

export type ActivityType = typeof activity

const SKCSWIN: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const { isMobile } = useResponsive()
  const { account } = useWeb3React()
  const [userActivityData, setuserActivityData] = React.useState<ActivityType>(activity)

  React.useEffect(() => {
    async function queryRegister() {
      if (!account) {
        return
      }
      const hasRegitered = localStorage.getItem(`${account}-registerd`)
      if (hasRegitered) {
        setuserActivityData((data) => {
          return { ...data, registered: true }
        })
      } else {
        setuserActivityData((data) => {
          return { ...data, registered: false }
        })
      }

      try {
        const { data } = await AcitivityService.hasRegister(account)

        if (!data.code) {
          const register = data.data.registered
          // update status
          if (register) {
            setuserActivityData((data) => {
              return { ...data, registered: true }
            })
            localStorage.setItem(`${account}-registerd`, 'true')
          }
        } else {
          StyledNotification.error({ message: data.error })
        }
      } catch (e) {
        console.log(e)
      }
    }

    queryRegister()
  }, [account, setuserActivityData])

  const getLeaderBoard = async (account) => {
    try {
      const { data } = await AcitivityService.leaderBoard(account)
      const { code } = data
      if (!code) {
        const { leader, snapshot_block_number, snapshot_time, user } = data.data
        setuserActivityData((oldData) => {
          return {
            ...oldData,
            top10List: {
              list: leader ?? [],
              lastUpdate: snapshot_time,
              blockHeight: snapshot_block_number,
            },
            rank: user?.rank ?? 0,
            stakingAmount: user?.amount ?? '0',
          }
        })
      }
      console.log('response', data)
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    getLeaderBoard(account)
  }, [account, setuserActivityData])

  const registerByAccount = React.useCallback(
    async () => {
      console.log('acccount', account)
      if (!account) return
      try {
        const { data } = await AcitivityService.register(account)
        if (!data.code) {
          setuserActivityData((data) => {
            return { ...data, registered: true }
          })
          localStorage.setItem(`${account}-registerd`, 'true')
          StyledNotification.success({ message: t('Register Respond') })
          getLeaderBoard(account)
        } else {
          StyledNotification.error({ message: data.error })
        }
      } catch (e) {
        console.log(e)
      }
    },
    [account, setuserActivityData]
  )

  return (
    <SKCSWINWrap>
      <Banner activity={activity} />
      <SKCSWinContentWrap>
        <Content>
          <Row1>
            <Participate userActivityData={userActivityData} registerByAccount={registerByAccount} />
            <PrizePool
              styles={{ marginTop: isMobile ? '48px' : '0px' }}
              userActivityData={userActivityData}
              registerByAccount={registerByAccount}
            />
          </Row1>
          <Row1>
            <Leaderboard userActivityData={userActivityData} />
            <Rules styles={{ marginTop: isMobile ? '48px' : '0px' }} userActivityData={userActivityData} />
          </Row1>
        </Content>
      </SKCSWinContentWrap>
    </SKCSWINWrap>
  )
}

export default SKCSWIN
