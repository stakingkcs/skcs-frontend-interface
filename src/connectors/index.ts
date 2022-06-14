import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from './NetworkConnector'
import { networks } from '../constants/networks'
import { getNetworkInfo } from '../utils/index'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
}

// rpc
const NETWORK_URL = process.env.REACT_APP_NETWORK_URL

// chainId
export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '321')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
})

export function getNetWorkConnect(chainId: ChainId) {
  const selectedNetwork = getNetworkInfo(chainId)
  return new NetworkConnector({
    urls: { [chainId]: selectedNetwork.rpc },
  })
}

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

// support chain
export const ChainIds = Reflect.ownKeys(networks).map((n) => Number(n))
export const ChainKeys = Reflect.ownKeys(networks).map((n) => String(n))
export type ChainId = keyof typeof networks
export type ChainKey = keyof typeof ChainKeys

export const injected = new InjectedConnector({
  supportedChainIds: [NETWORK_CHAIN_ID],
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

/* // mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    '...', // uniswap logo 图片
}) */

export const connectorsByName: any = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
}
