import { debounce } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { fetchPoolsPublicDataAsync } from './pools'
import { State } from './types'
import { useWeb3React } from '@web3-react/core'
import { sortBy } from 'lodash'

const debounceUseFetchPublicData = debounce((account, dispatch) => {
  dispatch(fetchPoolsPublicDataAsync(account))
}, 500)

export const useFetchPoolsPublicData = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    debounceUseFetchPublicData(account, dispatch)
  }, [dispatch, account])
}

export const usePools = () => {
  return useSelector((state: State) => state.pools.data)
}

export const usePoolFromAddress = (address: string) => {
  const pools = useSelector((state: State) => state.pools.data)
  for (let i = 0; i < pools.length; i++) {
    if (pools[i].address.toLowerCase() === address.toLowerCase()) {
      return pools[i]
    }
  }
}

export const useSortedPools = () => {
  const pools = usePools()
  return sortBy(pools, (p) => (p?.votes ? -p.votes?.toNumber() : 1))
}

export const usePoolsUpdatedTime = () => {
  return useSelector((state: State) => state.pools.updatedAt)
}

export const useWalletId = () => {
  return useSelector((state: State) => state.wallet.walletId)
}
