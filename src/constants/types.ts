export type TranslatableText =
  | string
  | {
      key: string
      data?: {
        [key: string]: string | number
      }
    }

export interface Address {
  322?: string
  321?: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
}

export enum ValidatorStatus {
  'Active',
  'Inactive',
  'In Jail',
}

export interface PoolConfig {
  address: string
  website: string
  email: string
  details: string
  name: string
}

export type PageMeta = {
  title: string
  description: string
  image: string
}
