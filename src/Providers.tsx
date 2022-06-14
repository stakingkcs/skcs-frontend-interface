import React, { FunctionComponent } from 'react'
import { ConfigProvider } from 'antd'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import store from './state'
import { NetworkContextName, OppositeNetworkName } from './constants/wallet'
import { getLibrary } from './components/Web3ReactManager'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const Web3ReactOppsiteProvider = createWeb3ReactRoot(OppositeNetworkName)

const Providers: FunctionComponent = ({ children }) => {
  return (
    <HelmetProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Web3ReactOppsiteProvider getLibrary={getLibrary}>
            <ConfigProvider>
              <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
              </Provider>
            </ConfigProvider>
          </Web3ReactOppsiteProvider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </HelmetProvider>
  )
}

export default Providers
