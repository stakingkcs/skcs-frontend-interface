import Axios, { HttpResponse } from './axios'

interface Response<T> {
  code: number
  data: T
  error: string
}

// bridge-list

export class AcitivityService {
  /**
   * @description get pair list
   * @return {HttpResponse} result
   */
  static register(account: string): Promise<HttpResponse<{ status: string }>> {
    return Axios({
      method: 'post',
      url: '/register',
      data: {
        address: account,
      },
    })
  }

  static hasRegister(account: string): Promise<HttpResponse<{ registered: boolean }>> {
    return Axios({
      method: 'get',
      url: `/register?address=${account}`,
    })
  }

  static leaderBoard(account?: string | null): Promise<
    HttpResponse<{
      leader: { address: string; amount: string; rank: number }[]
      snapshot_block_number: number
      snapshot_time: number
      user: {
        rank: number
        address: string
        amount: string
      }
    }>
  > {
    return Axios({
      method: 'get',
      url: account ? `/topN?address=${account}` : '/topN',
    })
  }
}
