import { useWeb3React } from '@web3-react/core'
import { ChainIds } from 'connectors'
import { BigNumber } from 'ethers/utils'
import useAuth from 'hooks/useAuth'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow, updateBalance, updateWalletId } from 'state/wallet/actions'
import { switchNetwork } from '../../utils/wallet'
import { useLanguage } from './hooks'

import useDebounce from 'hooks/useDebounce'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { updateBlockNumber } from './actions'

export default function Updater(): null {
  // init language
  const { i18n } = useTranslation()
  const lang = useLanguage()
  const { account, library, chainId } = useWeb3React()
  const dispatch = useDispatch()

  const windowVisible = useIsWindowVisible()

  const { login } = useAuth()

  const [state, setState] = React.useState<{ chainId: number | undefined; blockNumber: number | null }>({
    chainId,
    blockNumber: null,
  })

  const blockNumberCallback = React.useCallback(
    (blockNumber: number) => {
      setState((s) => {
        if (chainId === s.chainId) {
          if (typeof s.blockNumber !== 'number') return { chainId, blockNumber }
          return { chainId, blockNumber: Math.max(blockNumber, s.blockNumber) }
        }
        return s
      })
    },
    [chainId, setState]
  )

  const debouncedState = useDebounce(state, 100)

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined

    setState({ chainId, blockNumber: null })

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    library.on('block', blockNumberCallback)
    return () => {
      library.removeListener('block', blockNumberCallback)
    }
  }, [dispatch, chainId, library, blockNumberCallback, windowVisible])

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

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return
    dispatch(updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber }))
  }, [windowVisible, dispatch, debouncedState.blockNumber, debouncedState.chainId])

  return null
}
