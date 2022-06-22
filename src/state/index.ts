import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'
import { getThemeCache } from '../utils/theme'

import application from './application/reducer'
import wallet from './wallet/reducer'
import staker from './staker'
import prices from './prices'
import { useDispatch } from 'react-redux'

const PERSISTED_KEYS: string[] = ['application']
const loadedState = load({ states: PERSISTED_KEYS }) as any

if (loadedState.application) {
  loadedState.application = { ...loadedState.application, darkMode: getThemeCache() }
}

const store = configureStore({
  reducer: {
    application,
    wallet,
    staker,
    prices
  },
  middleware: [
    ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
    save({ states: PERSISTED_KEYS, debounce: 500 }),
  ],
  preloadedState: loadedState,
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
