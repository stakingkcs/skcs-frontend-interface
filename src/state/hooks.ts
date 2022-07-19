import { debounce } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { fetchStakerPublicDataAsync } from './staker'
import { State } from './types'
import { useWeb3React } from '@web3-react/core'
import { sortBy } from 'lodash'
import { getAddress } from 'utils/addressHelpers'
import tokens from 'constants/tokens'
import { multiply } from '../utils/bignumber'
import BigNumber from 'bignumber.js'

const debounceUseFetchPublicData = debounce((account, dispatch) => {
  dispatch(fetchStakerPublicDataAsync(account))
}, 500)

export const useFetchStakerPublicData = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    debounceUseFetchPublicData(account, dispatch)
  }, [dispatch, account])
}

export const useWalletId = () => {
  return useSelector((state: State) => state.wallet.walletId)
}

export const useStakerState = () => {
  return useSelector((state: State) => state.staker)
}

export const useSKCSPrice = () => {
  const wkcsAddress = getAddress(tokens.wkcs.address).toLowerCase()
  return useSelector((state: State) =>
    new BigNumber(state.prices.data[wkcsAddress].price).multipliedBy(state.staker.skcsQuetoByKCS.toString() ?? '0')
  )
}

export const useKCSPrice = () => {
  const wkcsAddress = getAddress(tokens.wkcs.address).toLowerCase()
  return useSelector((state: State) => new BigNumber(state.prices.data[wkcsAddress].price))
}
