import { createReducer } from '@reduxjs/toolkit'
import {
  updateBlockNumber,
  changeLanguage,
  changeTheme,
  changeMobileMenuShow,
  updateBridgeLoading,
  updateAprList,
} from './actions'

export interface ApplicationState {
  blockNumber: { [chainId: number]: number }
  darkMode: boolean
  language: string
  mobileMenuShow: boolean
  bridgeLoadingVisible: boolean
  bridgeLoadingStatus: number
  aprList: { [key: string]: string }
}

const initialState: ApplicationState = {
  blockNumber: {},
  darkMode: false,
  language: 'en',
  mobileMenuShow: false,
  bridgeLoadingVisible: false,
  bridgeLoadingStatus: 0,
  aprList: {},
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(changeTheme, (state, action) => {
      const { isDark } = action.payload
      if (isDark) {
        state.darkMode = true
      } else {
        state.darkMode = false
      }
    })
    .addCase(changeLanguage, (state, action) => {
      const { lng } = action.payload
      if (lng) {
        state.language = lng
      } else {
        state.language = 'en'
      }
    })
    .addCase(changeMobileMenuShow, (state, action) => {
      const { show } = action.payload
      state.mobileMenuShow = show
    })
    .addCase(updateAprList, (state, action) => {
      const aprList = action.payload
      state.aprList = aprList
    })
)
