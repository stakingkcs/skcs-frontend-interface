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
    background: #f8f9fd;
  }
`

const Text = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: center;
  max-width: 265px;
  justify-content: center;
  color: #494e67;
  margin: 20px 0px 20px 0;
`

const WalletListWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
`

const WalletItem = styled.div`
  position: relative;
  margin-top: 16px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 120px;
  cursor: pointer;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.03);
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
  font-weight: 400;
  color: #01081e;
  font-size: 14px;
  font-family: 'Montserrat';
  font-style: normal;
  margin-top: 10px;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
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
          console.log('No wallet is valid')
      }
    } else {
      message.warn(t(`Please select one of the wallets in the list`))
    }
  }

  const handleConnect = (id: number) => {
    connect(id)
  }

  const walletList = WalletList.map((item, index) => {
    return (
      <WalletItem key={index} onClick={handleConnect.bind(null, item.id)}>
        <Image src={item.logo} width="48px" height="auto" />
        <Name>{item.name}</Name>
      </WalletItem>
    )
  })

  return (
    <StyledModal
      visible={visible}
      footer={null}
      centered
      width={isMobile ? '300px' : '344px'}
      style={{ borderRadius: '8px', background: '#f8f9fd' }}
      destroyOnClose
      onCancel={() => {
        dispatch(toggleConnectWalletModalShow({ show: false }))
      }}
    >
      <ColumnCenterBox>
        <ModalTitle>{t(`Connect Your Wallet`)}</ModalTitle>
        <Text>Please connect your wallet with one of the wallet providers</Text>
        <WalletListWrap>
          {walletList}
          {/* <MoreWalletItem>
          <Name>{t(`Coming Soon...`)}</Name>
          <EllipsisOutlined />
        </MoreWalletItem> */}
        </WalletListWrap>
      </ColumnCenterBox>
      {/* <ConnectButton onClick={connect}>
        {selectedId === -1 ? t(`Please select a wallet`) : t(`Connect Wallet`)}
      </ConnectButton> */}
    </StyledModal>
  )
}

export default WalletListModal
