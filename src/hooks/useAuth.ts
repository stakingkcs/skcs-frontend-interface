import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorLocalStorageKey } from '../constants/wallet'
import { ConnectorNames, connectorsByName, injected } from '../connectors'
import { updateErrorInfo } from '../state/wallet/actions'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import i18next from 'i18next'
import StyledNotification from 'components/StyledNotification'

/*  */
const useAuth = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID: ConnectorNames) => {
    console.log('connectorID', connectorID)

    const connector = connectorsByName[connectorID]
    if (connector) {
      dispatch(updateErrorInfo({ hasError: false, errorInfo: '' }))
      window.localStorage.removeItem(connectorLocalStorageKey)
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          // error modal
          dispatch(updateErrorInfo({ hasError: true, errorInfo: t("COMPONENT_19") }))
        } else if (error instanceof NoEthereumProviderError) {
          StyledNotification.error({
            message: t("COMPONENT_20"),
            description: t("COMPONENT_21"),
          })
          dispatch(updateErrorInfo({ hasError: true, errorInfo: t("COMPONENT_22")}))
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = undefined
          }
          StyledNotification.error({
            message: t("COMPONENT_23"),
            description: t("COMPONENT_24"),
          })
          dispatch(updateErrorInfo({ hasError: true, errorInfo: t("COMPONENT_25") }))
        } else {
          StyledNotification.error({
            message: t("COMPONENT_26"),
            description: t(`${error.message}`),
          })
          dispatch(updateErrorInfo({ hasError: true, errorInfo: t("COMPONENT_26") }))
        }
      })
    } else {
      StyledNotification.error({
        message: t("COMPONENT_27"),
        description: t("COMPONENT_28"),
      })
      dispatch(updateErrorInfo({ hasError: true, errorInfo: t("COMPONENT_29") }))
    }
  }, [])

  return { login, logout: deactivate }
}

export default useAuth
