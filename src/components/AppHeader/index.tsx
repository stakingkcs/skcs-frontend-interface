import { MenuOutlined } from '@ant-design/icons'
import ChangeLanguage from 'components/ChangeLanguage'
import { BrowserView, MobileView } from 'components/Common'
import { Image } from 'components/index'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../../constants/theme'
import { changeMobileMenuShow } from '../../state/application/actions'
import { useMobileMenuShow } from '../../state/application/hooks'
import { useResponsive } from '../../utils/responsive'
import AppMenu from '../AppMenu'
import UnlockButton from '../ConnectWalletButton'
import { RowCenterBox } from '../index'

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
  z-index: 999;
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
  padding-left: 10px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 60px;
  }
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
            <AppMenu style={{ width: '580px', position: 'relative', top: '3px' }} />
          </BrowserView>
        </HeaderLeftWrap>

        <RowCenterBox justify="flex-end">
          <UnlockButton />
          <ChangeLanguage styles={{ marginLeft: '12px' }} />
        </RowCenterBox>
      </AppHeaderContent>
    </AppHeaderWrap>
  )
}

export default withRouter(AppHeader)
