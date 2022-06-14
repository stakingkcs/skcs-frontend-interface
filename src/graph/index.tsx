import { request, gql } from 'graphql-request'

export const GRAPH_URL = process.env.REACT_APP_GRAPH_URL as string

const GET_LATESR_SHARES = gql`
  {
    accPerShareEntities {
      validator
      block
      accRewardPerShare
    }
  }
`

const GET_ACCREWARD_PERSHARE_BY_BLOCK = (block: number) => gql`
  {
    accPerShareEntities(block: { number: ${block} }) {
      validator
      block
      accRewardPerShare
    }
  }
`

export async function getLatestAccRewardPerShare() {
  const res = await request(GRAPH_URL, GET_LATESR_SHARES)
  return res
}

export async function getAccRewardPerShareByBlock(block: number) {

  const res = await request(GRAPH_URL, GET_ACCREWARD_PERSHARE_BY_BLOCK(block))
  return res
}
