/// <reference types="react-scripts" />

declare module '*.less'
interface Window {
  ethereum?: {
    isMetaMask?: true
    autoRefreshOnNetworkChange: boolean
    on: (...args: any[]) => void
    removeListener: (...args: any[]) => void
    request: any
    chainId?: string | undefined | null
  }
  web3?: any
}
