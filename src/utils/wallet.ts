import { getNetworkInfo, web3Utils } from './index'
import { Metamask } from './metamask'
import store from '../state'
import { updateErrorInfo } from '../state/wallet/actions'

export const getWalletInstance = (walletId: number) => {
  switch (walletId) {
    case 0:
      return Metamask
    default:
      return Metamask
  }
}

export const switchNetworkInPc = async (selectedNetworkInfo: any) => {
  await window.ethereum?.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: web3Utils.toHex(selectedNetworkInfo.chain_id).toString() }],
  })
}

export const addNetwork = async (selectedNetworkInfo: any) => {
  const net = {
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: web3Utils.toHex(selectedNetworkInfo.chain_id).toString(), // A 0x-prefixed hexadecimal string
        chainName: selectedNetworkInfo.fullName,
        nativeCurrency: {
          name: selectedNetworkInfo.symbol,
          symbol: selectedNetworkInfo.symbol.toUpperCase(), // 2-6 characters long
          decimals: selectedNetworkInfo.decimals,
        },
        rpcUrls: [selectedNetworkInfo.rpc],
        blockExplorerUrls: [selectedNetworkInfo.browser],
        iconUrls: [selectedNetworkInfo.logo],
      },
    ],
  }
  await window.ethereum?.request(net)
}

export const switchNetwork = async (id: any) => {
  const width = document.body.clientWidth ?? document.documentElement.clientWidth
  const selectedNetworkInfo = getNetworkInfo(id)
  const dispatch = store.dispatch

  if (width <= 768) {
    await addNetwork(selectedNetworkInfo)
    dispatch(updateErrorInfo({ hasError: false, errorInfo: '' }))
  } else {
    try {
      await switchNetworkInPc(selectedNetworkInfo)
      dispatch(updateErrorInfo({ hasError: false, errorInfo: '' }))
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error?.code === 4902) {
        try {
          await addNetwork(selectedNetworkInfo)
          dispatch(updateErrorInfo({ hasError: false, errorInfo: '' }))
        } catch (addError) {
          console.log(addError)
          // message.error(i18next.t(`Switch Network failed`))
        }
      }
    }
  }
}

export const addTokenToWallet = async (token: {
  tokenAddress: string
  symbol: string
  decimals: number
  image: string
}) => {
  if (!window.ethereum) return
  await window.ethereum
    .request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: token.tokenAddress,
          symbol: token.symbol.toUpperCase(),
          decimals: token.decimals,
          image: token.image,
        },
      },
    })
    .catch(console.error)
}

export const updateBalance = async (library: any, account: string) => {
  const walletId = store.getState().wallet.walletId
  const wallet = getWalletInstance(walletId)
  await wallet.updateBalance(library, account)
}
