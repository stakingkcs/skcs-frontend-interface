import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import reportWebVitals from './reportWebVitals'
import './utils/i18n'

import Providers from './Providers'
import ApplicationUpdater from './state/application/updater'

import 'normalize.css'
import './index.less'

if ('ethereum' in window) {
  // @ts-ignore
  window.ethereum.autoRefreshOnNetworkChange = true
}

window.addEventListener('error', () => {
  localStorage.removeItem('redux_localstorage_simple_lists')
})

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <>
        <ApplicationUpdater />
        <App />
      </>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
