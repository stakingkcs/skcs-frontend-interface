import { ChromeOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Badge, message } from 'antd'
import BN from 'bignumber.js'
import copy from 'copy-to-clipboard'
import i18next from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ChainId } from '../../connectors/index'
import { theme } from '../../constants/theme'
import { connectorLocalStorageKey } from '../../constants/wallet'
import useAuth from '../../hooks/useAuth'
import { useBalance, useWalletId } from '../../state/wallet/hooks'
import { getNetworkInfo, getWalletInfo } from '../../utils'
import { formatCurrency, shortAddress } from '../../utils/format'
import { updateBalance } from '../../utils/wallet'
import { useDispatch } from 'react-redux'
import { updateBalance as updateCurrentBalace } from '../../state/wallet/actions'
import { CenterBox, Image } from 'components'

export interface LogoutModalProps {
  visible: boolean
  toggleVisible: any
}

const WalletCenterWrap = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => {
    if (visible) {
      return 'flex'
    }
    return 'none'
  }};
  position: fixed;
  width: 100%;
  height: 100vh;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.8);
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const WalletInfoWrap = styled.div`
  position: relative;
  border-radius: 12px;
  background: #252528;
  width: 467px;
  height: auto;
  padding: 30px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    width: 96%;
  }
`
const SpaceRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const HighLightTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.bridgePrimay};
`
const NetworkNameWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 400;
`

const WalletName = styled.div`
  color: rgb(133, 133, 141);
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  width: 100%;
`

const BalanceWrap = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid ${theme.colors.bridgePrimay};
  border-radius: 16px;
  margin-top: 20px;
`

const BalanceText = styled.div`
  font-size: 20px;
  color: rgb(255, 255, 255);
  text-shadow: rgb(0 0 0 / 80%) 0px 4px 9px;
`
const NetworkIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
`
const ShiningBadge = styled(Badge)`
  .ant-badge-status-processing {
    background: ${theme.colors.primary};
  }
`

const OperateWrap = styled(SpaceRow)`
  margin-top: 32px;
`

const OperateItem = styled.div`
  border-radius: 16px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
`
const OperateIcon = styled.img`
  width: 20px;
  height: 20px;
`
const OperateText = styled.div`
  margin-top: 8px;
`

const ModalTitle = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #efeff2;
`

const SubTitle = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  color: #b4b7c1;
  width: 100%;
`
const InputContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-top: 7px;
  padding: 12px 16px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`
const InputText = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #efeff2;
  @media (max-width: 768px) {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`



const LogoutModal: React.FunctionComponent<LogoutModalProps> = (props) => {
  const dispatch = useDispatch()

  const { account, chainId, library } = useWeb3React()

  const { t } = useTranslation()
  const { logout } = useAuth()

  const walletId = useWalletId()

  const balance = useBalance()
  const OperateList = [
    {
      key: '0',
      title: t("COMPONENT_29"),
      icon: <OperateIcon src={require('../../assets/images/Icons/copy.png').default} />,
    },
    {
      key: '1',
      title: t("COMPONENT_30"),
      icon: <OperateIcon src={require('../../assets/images/Icons/share-gray.png').default} />,
    },
    {
      key: '2',
      title: t("COMPONENT_30"),
      icon: <OperateIcon src={require('../../assets/images/Icons/logout.png').default} />,
    },
  ]

  const walletInfo = React.useMemo(() => {
    return getWalletInfo(walletId)
  }, [walletId])

  React.useEffect(() => {
    if (library && account && chainId) {
      updateBalance(library, account)
    }
  }, [library, chainId, account])

  const copyAddress = () => {
    if (account) {
      copy(account)
      message.success(i18next.t('Copy Success'))
    }
  }

  const networkInfo = React.useMemo(() => {
    return getNetworkInfo(chainId as ChainId)
  }, [chainId])

  React.useEffect(() => {
    if (!chainId) {
      hideSelf()
    }
  }, [chainId])

  const nav2Scan = () => {
    const suffix = `/address/${account?.toLowerCase()}`
    if (chainId) {
      window.open(`${networkInfo.browser}${suffix}`, '_blank')
    }
  }

  const hideSelf = () => {
    props.toggleVisible(false)
  }

  const logoutAndLock = () => {
    window.localStorage.removeItem(connectorLocalStorageKey)
    logout()
    dispatch(updateCurrentBalace({ balance: '0' }))
    hideSelf()
  }

  const operateClick = (index: string) => {
    switch (index) {
      case '0':
        copyAddress()
        break
      case '1':
        nav2Scan()
        break
      case '2':
        logoutAndLock()
        break
      default:
        console.log('call errored')
    }
  }

  const OperateListDom = OperateList.map((operate, index) => {
    return (
      <CenterBox key={index} style={{ width: 'auto' }}>
        <OperateItem onClick={operateClick.bind(null, operate.key)}>{operate.icon}</OperateItem>
        <OperateText style={{ color: operate.title === 'Logout' ? '#FB6491' : '#fff' }}>
          {t(`${operate.title}`)}
        </OperateText>
      </CenterBox>
    )
  })

  return (
    <WalletCenterWrap
      visible={props.visible}
      onScroll={(e) => {
        e.preventDefault()
      }}
    >
      <WalletInfoWrap>
        <SpaceRow>
          <ModalTitle>{t("COMPONENT_12")}</ModalTitle>
          <Image
            style={{ cursor: 'pointer' }}
            src={require('../../assets/images/Icons/close-white.png').default}
            width="20px"
            height="20px"
            alt="close-icon"
            onClick={hideSelf}
          />
        </SpaceRow>

        <SubTitle style={{ marginTop: '20px' }}>{t("COMPONENT_13")}</SubTitle>
        <InputContainer>
          <Image src={networkInfo?.logo} width="20px" height="20px" alt="chain-logo" />
          <InputText style={{ marginLeft: '8px' }}>{networkInfo?.fullName}</InputText>
        </InputContainer>

        <SubTitle style={{ marginTop: '20px' }}>{t("COMPONENT_14")}</SubTitle>
        <InputContainer>
          <InputText>{account}</InputText>
        </InputContainer>

        <OperateWrap>{OperateListDom}</OperateWrap>
      </WalletInfoWrap>
    </WalletCenterWrap>
  )
}

export default LogoutModal
