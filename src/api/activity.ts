import Axios, { HttpResponse } from './axios'

// bridge-list

export class AcitivityService {
  /**
   * @description get pair list
   * @return {HttpResponse} result
   */
  static register(account: string): Promise<HttpResponse<any>> {
    return Axios({
      method: 'post',
      url: '/register',
    })
  }

  static hasRegister(account: string): Promise<HttpResponse<any>> {
    return Axios({
      method: 'get',
      url: `/register?account=${account}`,
    })
  }

  static leaderBoard(account?: string | null): Promise<HttpResponse<any>> {
    return Axios({
      method: 'get',
      url: account ? `/leaderBoard?for=${account}` : '/leaderBoard',
    })
  }
}
