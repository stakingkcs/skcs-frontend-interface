import { BigNumber } from 'ethers/utils'
import { PoolConfig, ValidatorStatus } from '../constants/types'

export type TranslatableText =
  | string
  | {
      id: number
      fallback: string
      data?: {
        [key: string]: string | number
      }
    }

export interface Pool extends PoolConfig {
  feeShares?: BigNumber
  apr?: number
  votes?: BigNumber
  status?: ValidatorStatus
  rank?: number
  userData?: {
    ballot: BigNumber
    feeShares: BigNumber
    pendingReward: BigNumber
    revokeLockingEndTime: BigNumber
    revokingBallot: BigNumber
    validatorBallot: BigNumber
  }
}

export interface PoolsState {
  data: Pool[]
  updatedAt: number
}

// API Price State
export interface PriceApiList {
  /* eslint-disable camelcase */
  [key: string]: {
    name: string
    symbol: string
    price: string
    price_BNB: string
  }
}

export interface PriceApiListThunk {
  /* eslint-disable camelcase */
  [key: string]: number
}

export interface PriceApiResponse {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiList
}

export interface PriceApiThunk {
  /* eslint-disable camelcase */
  updated_at: string
  data: PriceApiListThunk
}

export interface PriceState {
  isLoading: boolean
  lastUpdated: string
  data: PriceApiListThunk
}

// Block

export interface BlockState {
  currentBlock: number
  initialBlock: number
}

// Collectibles

export interface CollectiblesState {
  isInitialized: boolean
  isLoading: boolean
  data: {
    [key: string]: number[]
  }
}

// Global state

export interface State {
  prices: PriceState
  pools: PoolsState
  block: BlockState
}
