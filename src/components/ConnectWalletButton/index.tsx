import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../../constants/theme'
import { LanguageButton } from '../ChangeLanguage'
import { useWeb3React } from '@web3-react/core'
import { shortAddress } from '../../utils/format'
import { useTranslation } from 'react-i18next'
import { useWalletErrorInfo } from '../../state/wallet/hooks'
import LogoutModal from '../WalletCenter'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow } from '../../state/wallet/actions'
import { CenterRow } from '../Row'
import { Badge } from 'antd'
import { Image } from 'components'

import { AlertOutlined } from '@ant-design/icons'

import i18next from 'i18next'
import { getNetworkInfo } from 'utils'
import { switchNetwork } from '../../utils/wallet'
import { GradientBgColor } from 'components'
import { GradientText } from 'components/Text'
import { WalletList } from '../../constants/wallet'
import { useWalletId } from '../../state/hooks'

const ConnectButton = styled(LanguageButton)`
  width: auto;
  color: ${theme.colors.primary};
  margin-left: 10px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  height: 36px;
  font-size: 14px;
  border: 1.5px solid #00d092;
  background: #000;
`

const GradientButton = styled(ConnectButton)`
  position: relative;
  border: none;
  box-shadow: none;
  overflow: hidden;
  ${GradientBgColor}
  &:hover {
    ${GradientBgColor}
  }
`

const GradientButtonContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`

const GradientButtonBg = styled.div`
  position: absolute;
  width: 99%;
  height: 34px;
  left: 1px;
  top: 1px;
  background: #000;
  border-radius: 20px;
  z-index: 1;
`

const Text = styled.span`
  user-select: none;
`
const HighlightText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding: 0 15px;
  border: 1px solid ${theme.colors.primary};
  user-select: none;
  height: 30px;
  font-weight: bold;
`

const ErrorButton = styled(ConnectButton)`
  color: #f00;
  display: flex;
  padding-right: 15px;
  justify-content: center;
  align-items: center;
  background: rgba(248, 71, 82, 0.2);
  border-radius: 30px;
  border: none;
  &:hover {
    background: rgba(248, 71, 82, 0.2) !important;
  }

  ${Text} {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #f84752;
  }
`
const WalletIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`

const NetworkWrap = styled(CenterRow)`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: auto;
  padding-right: 5px;
  padding-left: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  background: #252528;
`

const Shining = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.8;
  }
`

const AnimationBadge = styled(Badge)`
  animation: ${Shining} 1s infinite ease-in-out;
`

const UnlockButton: React.FunctionComponent = () => {
  const { t } = useTranslation()

  const { account, chainId } = useWeb3React()

  const [logoutModalShow, setLogoutModalShow] = React.useState<boolean>(false)

  const dispatch = useDispatch()

  const walletId = useWalletId()

  const { errorInfo, hasError } = useWalletErrorInfo()

  const walletLogo = React.useMemo(() => {
    return WalletList[walletId].logo
  }, [walletId])

  const hideLogout = (show: boolean) => {
    setLogoutModalShow(() => show)
  }

  const connect = () => {
    dispatch(toggleConnectWalletModalShow({ show: true }))
  }

  const btn = React.useMemo(() => {
    if (hasError) {
      return (
        <ErrorButton onClick={() => switchNetwork(process.env.REACT_APP_CHAIN_ID)}>
          <Image
            src={require('../../assets/images/Icons/wifi.png').default}
            width="20px"
            height="20px"
            alt="wifi-icon"
          />
          <Text style={{ marginLeft: '6px' }}>{i18next.t(`${errorInfo}`)}</Text>
        </ErrorButton>
      )
    } else if (account) {
      return (
        <GradientButton
          onClick={() => {
            setLogoutModalShow(() => true)
          }}
        >
          <GradientButtonBg />
          <GradientButtonContent>
            <WalletIcon
              src={account ? walletLogo : require('../../assets/images/Icons/wallet.png').default}
              alt="wallet-icon"
            />
            <GradientText fontSize="14px">{shortAddress(account)}</GradientText>
          </GradientButtonContent>
        </GradientButton>
      )
    } else {
      return (
        <GradientButton onClick={connect}>
          <GradientButtonBg />
          <GradientButtonContent>
            <WalletIcon
              src={account ? walletLogo : require('../../assets/images/Icons/wallet.png').default}
              alt="wallet icon"
            />
            <GradientText style={{ paddingRight: '15px', fontSize: '14px' }}>{t(`Connect Wallet`)}</GradientText>
          </GradientButtonContent>
        </GradientButton>
      )
    }
  }, [hasError, account, chainId])

  return (
    <div style={{ zIndex: 999, position: 'relative' }}>
      {btn}
      <LogoutModal visible={logoutModalShow} toggleVisible={hideLogout} />
    </div>
  )
}

export default UnlockButton
