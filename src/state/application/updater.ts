import { useWeb3React } from '@web3-react/core'
import { ChainIds } from 'connectors'
import { BigNumber } from 'ethers/utils'
import useAuth from 'hooks/useAuth'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow, updateBalance, updateWalletId } from 'state/wallet/actions'
import { switchNetwork } from '../../utils/wallet'
import { useLanguage } from './hooks'


export default function Updater(): null {
  // init language
  const { i18n } = useTranslation()
  const lang = useLanguage()
  const { account, library, chainId } = useWeb3React()
  const dispatch = useDispatch()

  const { login } = useAuth()

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [])

  useEffect(() => {
    if (account && library && chainId && dispatch) {
      library.getBalance(account).then((balance: BigNumber) => {
        dispatch(updateBalance({ balance: balance.toString() }))
      })
    }
  }, [account, library, chainId, dispatch])

  useEffect(() => {
    if (window?.ethereum && ![321, 322].includes(chainId as any)) {
      switchNetwork(process.env.REACT_APP_CHAIN_ID as any)
    }
  }, [chainId])

  return null
}
