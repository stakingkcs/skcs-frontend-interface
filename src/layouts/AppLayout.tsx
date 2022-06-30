import React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import AppFooter from '../components/AppFooter'
import AppHeader from '../components/AppHeader/index'

const AppContentWrap = styled.div`
  position: relative;
  height: auto;
  min-height: 100vh;
  background: #000;
  padding-bottom: 100px;
`

// Not fullscreen mode
const AppBaseLayout: FunctionComponent = ({ children }) => {
  return (
    <div style={{ position: 'relative' }}>
      <AppHeader />
      <AppContentWrap>{children}</AppContentWrap>
      <AppFooter />
    </div>
  )
}

// App layout
const AppLayout: FunctionComponent = ({ children }) => {
  const isFullScreen = localStorage.getItem('FULLSCREEN_MODE')
  if (isFullScreen) return <div>{children}</div>
  return <AppBaseLayout>{children}</AppBaseLayout>
}

export default AppLayout
