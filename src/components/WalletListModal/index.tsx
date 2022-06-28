import ModelViewer from '@metamask/logo'
import { message, Modal } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { theme } from '../../constants/theme'
import { connectorLocalStorageKey, WalletList } from '../../constants/wallet'
import useAuth from '../../hooks/useAuth'
import { toggleConnectWalletModalShow, updateWalletId } from '../../state/wallet/actions'
import { ModalTitle } from '../Common'
import { useResponsive } from '../../utils/responsive'
import { ColumnCenterBox } from '../index'
import { Image } from 'components/index'
import { ConnectorNames } from 'connectors'

export interface WalletListModalProps {
  visible: boolean
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: #000;
    backdrop-filter: blur(90px);
    border-radius: 8px;
  }
`

const Text = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #b4b7c1;
`

const WalletListWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const WalletItem = styled.div`
  position: relative;
  margin-top: 16px;
  border-radius: 8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.03);
  padding: 14px 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  }
`

const MoreWalletItem = styled.div`
  position: relative;
  margin-top: 16px;
  background: #ffffff;
  border: 1px solid rgba(1, 8, 30, 0.1);
  box-shadow: none;
  border-radius: 8px;
  height: 48px;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  cursor: not-allowed;
  padding: 13px 16px;
`

const Name = styled.span`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #efeff2;
  margin-left: 12px;
`
const Icon = styled.div`
  position: relative;
  width: 48px;
  height: auto;
  margin-top: 10px;
`

const ConnectButton = styled.div`
  margin-top: 16px;
  background: ${theme.colors.bridgePrimay};
  border-radius: 4px;
  height: 40px;
  line-height: 42px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  font-size: 14px;
`

const RightBottomWrap = styled.img`
  color: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 24px;
  width: 24px;
`

const WalletListModal: React.FunctionComponent<WalletListModalProps> = ({ visible }) => {
  const { t } = useTranslation()

  const { isMobile } = useResponsive()

  const { login } = useAuth()

  const dispatch = useDispatch()

  const connect = async (selectedId: number) => {
    console.log('selectedId', selectedId)
    if (selectedId !== -1) {
      switch (selectedId) {
        case 0:
          // switch supported chain first
          await login(ConnectorNames.Injected)
          window.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Injected)
          dispatch(toggleConnectWalletModalShow({ show: false }))
          dispatch(updateWalletId({ walletId: 0 }))
          break
        case 1:
          await login(ConnectorNames.WalletConnect)
          window.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.WalletConnect)
          dispatch(toggleConnectWalletModalShow({ show: false }))
          dispatch(updateWalletId({ walletId: 1 }))
          break
        default:
          await login(ConnectorNames.Injected)
          window.localStorage.setItem(connectorLocalStorageKey, ConnectorNames.Injected)
          dispatch(toggleConnectWalletModalShow({ show: false }))
          dispatch(updateWalletId({ walletId: 2 }))
      }
    } else {
      message.warn(t(`Please select one of the wallets in the list`))
    }
  }

  const handleConnect = (id: number) => {
    connect(id)
  }

  const walletList = React.useMemo(() => {
    const mobileOnly = [2]
    return WalletList.map((item, index) => {
      if (isMobile || (!isMobile && !mobileOnly.includes(item.id))) {
        return (
          <WalletItem key={index} onClick={handleConnect.bind(null, item.id)}>
            <Image src={item.logo} width="32px" height="auto" />
            <Name>{item.name}</Name>
          </WalletItem>
        )
      }
    }).filter((n) => n)
  }, [isMobile])

  return (
    <StyledModal
      visible={visible}
      footer={null}
      centered
      width={isMobile ? '300px' : '400px'}
      style={{ borderRadius: '8px', background: '#000000' }}
      destroyOnClose
      closeIcon={
        <Image
          src={require('../../assets/images/Icons/close-white.png').default}
          width="20px"
          height="20px"
          alt="close-icon"
        />
      }
      onCancel={() => {
        dispatch(toggleConnectWalletModalShow({ show: false }))
      }}
    >
      <ColumnCenterBox align="flex-start" style={{ width: '100%' }}>
        <ModalTitle>{t(`Connect Your Wallet`)}</ModalTitle>
        <Text style={{ marginTop: '16px' }}>Please connect your wallet with one of the wallet providers</Text>
        <WalletListWrap>{walletList}</WalletListWrap>
      </ColumnCenterBox>
    </StyledModal>
  )
}

export default WalletListModal
