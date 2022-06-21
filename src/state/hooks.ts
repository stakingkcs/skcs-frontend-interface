import { debounce } from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { fetchStakerPublicDataAsync } from './staker'
import { State } from './types'
import { useWeb3React } from '@web3-react/core'
import { sortBy } from 'lodash'

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
