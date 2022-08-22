import React from 'react'
import styled from 'styled-components'
import Banner from './Banner'

const SKCSWINWrap = styled.div``

const activity = {
  title: 'sKCSWin.Title',
  startTime: '2022-08-10 10:00:00',
  endTime: '2022-08-25 10:00:00',
  rules: 'sKCS.Rules',
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
  return (
    <SKCSWINWrap>
      <Banner activity={activity} />
    </SKCSWINWrap>
  )
}

export default SKCSWIN
