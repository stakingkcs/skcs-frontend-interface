/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import tokens from 'constants/tokens'
import { PriceApiResponse, PriceApiThunk, PriceState } from 'state/types'
import { getAddress } from 'utils/addressHelpers'

const initialState: PriceState = {
  isLoading: false,
  lastUpdated: '',
  data: { [getAddress(tokens.wkcs.address).toLowerCase()]: { price: '0' } },
}

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    updatePriceList: (state, action) => {
      state.isLoading = true
      state.lastUpdated = action.payload.updated_at
      state.data = action.payload.data
    },
  },
})

export const { updatePriceList } = pricesSlice.actions

export default pricesSlice.reducer
