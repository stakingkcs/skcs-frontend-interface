import { SafeAppConnector, useSafeAppConnection } from '@gnosis.pm/safe-apps-web3-react'
import { AcitivityService } from 'api/activity'
import FullLoading from 'components/FullLoading'
import WalletListModal from 'components/WalletListModal'
import Web3ReactManager, { getLibrary } from 'components/Web3ReactManager'
import { useStakeApr } from 'hooks/useStakerApr'
import AppLayout from 'layouts/AppLayout'

import Home from 'pages/home/'

import { lazy, Suspense, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useFetchStakerPublicData } from 'state/hooks'
import { useConnectWalletModalShow } from 'state/wallet/hooks'
import { useFetchPriceList } from 'utils/prices'
import { useKCSApr } from '../hooks/useKCSApr'

const Staking = lazy(() => import(/* webpackChunkName:'Staking' */ 'pages/staking'))
const SKCSWIN = lazy(() => import(/* webpackChunkName:'SKCSWIN' */ 'pages/skcswin'))
const DeFiMarket = lazy(() => import(/* webpackChunkName:'DeFiMarket' */ 'pages/defimarket'))
const NotFound = lazy(() => import(/* webpackChunkName:'NotFound' */ 'pages/error'))

const safeMultisigConnector = new SafeAppConnector()

export default function App() {
  useFetchStakerPublicData()
  useFetchPriceList()
  useStakeApr()
  useKCSApr()

  const walletListModalShow = useConnectWalletModalShow()

  const triedToConnectToSafe = useSafeAppConnection(safeMultisigConnector)

  useEffect(() => {
    if (triedToConnectToSafe) {
      // fallback to other providers
      console.log('failed load gnosis')
    }
  }, [triedToConnectToSafe])

  return (
    <Suspense fallback={<FullLoading />}>
      <Web3ReactManager getLibrary={getLibrary}>
        <AppLayout>
          <WalletListModal visible={walletListModalShow} />
          <Switch>
            <Route path="/home" exact={true} component={Home} />
            <Route path="/staking" exact={true} component={Staking} />
            <Route path="/defi-market" exact={true} component={DeFiMarket} />
            <Route path="/skcs-win" exact={true} component={SKCSWIN} />
            <Route path="/" exact={true}>
              <Redirect to="/home" />
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </AppLayout>
      </Web3ReactManager>
    </Suspense>
  )
}
