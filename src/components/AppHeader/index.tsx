import React from 'react'
import styled from 'styled-components'
import AppMenu from '../AppMenu'
import { theme } from '../../constants/theme'
import { MenuOutlined } from '@ant-design/icons'
import { useMobileMenuShow } from '../../state/application/hooks'
import { useDispatch } from 'react-redux'
import { changeMobileMenuShow } from '../../state/application/actions'
import { useResponsive } from '../../utils/responsive'
import UnlockButton from '../ConnectWalletButton'
import { useHistory, withRouter } from 'react-router-dom'
import { BrowserView, MobileView } from 'components/Common'
import { Image } from 'components/index'

const AppHeaderWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 0px 20px;
  top: 0;
  left: 0;
  position: absolute;
  background: transparent;
  z-index: 6;
  @media (max-width: 768px) {
    background: #000000;
    position: relative;
  }
`

const Box = styled.div`
  display: flex;
  align-items: center;
`

const HeaderLeftWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 1200px) {
    padding-left: 0px;
  }
`

const AppHeaderContent = styled(HeaderLeftWrap)<{ isMobile: boolean }>`
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`

const KccLogo = styled(Image)`
  width: 104px;
  height: auto;
  cursor: pointer;
`

const MenuClose = styled.img`
  width: 24px;
  height: 24px;
`

const AppHeader: React.FunctionComponent = () => {
  // const [mobileMenuShow, setMobileMenuShow] = React.useState(false)

  const show = useMobileMenuShow()
  const { isMobile } = useResponsive()

  const history = useHistory()

  const dispatch = useDispatch()

  return (
    <AppHeaderWrap>
      <AppHeaderContent isMobile={isMobile}>
        <HeaderLeftWrap>
          <MobileView style={{ width: '28px' }}>
            {!show ? (
              <MenuOutlined
                style={{ fontSize: '18px', color: theme.colors.primary }}
                onClick={() => {
                  dispatch(changeMobileMenuShow({ show: true }))
                }}
              />
            ) : (
              <MenuClose
                src={require('assets/images/Icons/menu-close.png').default}
                onClick={() => {
                  dispatch(changeMobileMenuShow({ show: false }))
                }}
              />
            )}

            {show ? <AppMenu style={{ width: '100%' }} /> : null}
          </MobileView>
          <KccLogo
            src={require('../../assets/images/Icons/logo.svg').default}
            alt="kcc-logo"
            onClick={() => {
              history.push('/')
            }}
          />
          <BrowserView>
            <AppMenu style={{ width: '480px', position: 'relative', top: '3px' }} />
          </BrowserView>
        </HeaderLeftWrap>

        <Box>
          <UnlockButton />
        </Box>
      </AppHeaderContent>
    </AppHeaderWrap>
  )
}

export default withRouter(AppHeader)
