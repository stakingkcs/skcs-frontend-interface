export const MAIN_NETWORKS = {
  321: {
    name: 'KCC Mainnet',
    fullName: 'KCC Mainnet Network',
    abbr: 'KCC',
    rpc: 'https://rpc-mainnet.kcc.network',
    chain_id: 321,
    decimals: 18,
    symbol: 'KCS',
    browser: 'https://explorer.kcc.io/en',
    logo: 'https://cdn.jsdelivr.net/gh/kucoin-community-chain/tokens-info@main/icons/chain-321.png',
    standard: 'KRC20',
  },
}

export const TEST_NETWORKS = {
  4: {
    name: 'Rinkeby',
    abbr: 'Rinkeby',
    fullName: 'Rinkeby Network',
    rpc: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chain_id: 4,
    decimals: 18,
    symbol: 'ETH',
    browser: 'https://rinkeby.etherscan.io',
    logo: 'https://cdn.jsdelivr.net/gh/kucoin-community-chain/tokens-info@main/icons/chain-1.png',
    standard: 'ERC20',
    fee: 0.01,
  },
  322: {
    name: 'KCC Testnet',
    fullName: 'KCC Testnet',
    abbr: 'KCC-TEST',
    rpc: 'https://rpc-testnet.kcc.network',
    chain_id: 322,
    decimals: 18,
    symbol: 'KCS',
    browser: 'https://scan-testnet.kcc.network',
    logo: 'https://cdn.jsdelivr.net/gh/kucoin-community-chain/tokens-info@main/icons/chain-321.png',
    standard: 'KRC20',
  },
  1337: {
    name: 'localhost',
    fullName: 'localhost',
    abbr: 'localhost',
    rpc: 'http://127.0.0.1:8545',
    chain_id: 1337,
    decimals: 18,
    symbol: 'ETH',
    browser: 'https://scan-testnet.kcc.network',
    logo: 'https://cdn.jsdelivr.net/gh/kucoin-community-chain/tokens-info@main/icons/chain-1.png',
    standard: 'KRC20',
  },
}

export const networks = process.env.REACT_APP_NETWORK_ENV === 'main' ? MAIN_NETWORKS : TEST_NETWORKS

export const KCC_NETWORK_IDS = [322, 321]

export interface NetworkType {
  name: string
  rpc: string
  fullName: string
  chain_id: number
  symbol: string
  browser: string
  decimals: number
  logo: string
  standard: string
  fee?: number
  abbr: string
}

export interface AddEthereumChainParameter {
  chainId: string // A 0x-prefixed hexadecimal string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}
