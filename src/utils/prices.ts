import tokens from 'constants/tokens'
import useRefresh from 'hooks/useRefresh'
import { getTokenPrice } from 'hooks/useTokenPrice'
import React from 'react'
import store, { useAppDispatch } from 'state'
import { updatePriceList } from 'state/prices'
import { getAddress } from './addressHelpers'

export const useFetchPriceList = () => {
  const dispatch = useAppDispatch()
  const { priceReresh } = useRefresh()

  async function getPricesList() {
    const updated_at1 = store.getState().prices.lastUpdated
    const now = new Date().getTime()

    console.log('prics updated_at1', updated_at1)
    const kcsPriceData = await getTokenPrice()
    let tempData = { [getAddress(tokens.wkcs.address).toLowerCase()]: { price: kcsPriceData } }
    const p1 = {
      updated_at: new Date().getTime().toString(),
      data: {
        ...tempData,
      },
    }
    dispatch(updatePriceList(p1))
  }

  React.useEffect(() => {
    getPricesList()
  }, [dispatch, priceReresh])
}
