import { QuestionCircleOutlined } from '@ant-design/icons'
import { useWeb3React } from '@web3-react/core'
import { Tooltip } from 'antd'
import { RowCenterBox } from 'components'
import DataItem from 'components/DataItem'
import StyledButton from 'components/StyledButton'
import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import ExternalLink from '../../../components/ExternalLink/index'
import { toggleConnectWalletModalShow } from '../../../state/wallet/actions'
import { useBalance } from '../../../state/wallet/hooks'

const BannerImage = require('../../../assets/images/staking/banner.png').default

const HeaderPanel = styled.div`
  background: url(${BannerImage}) top center no-repeat;
  background-size: 100% 100%;
  border-radius: 16px;
  width: 100%;
  height: 102px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  padding-left: 36px;
`

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  display: flex;
  align-items: center;
  color: #ffffff;
`

const Desc = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #ffffff;
`
const ContentWrap = styled.div<{ connected: boolean }>`
  margin-top: ${({ connected }) => {
    if (connected) {
      return '0px'
    }
    return '24px'
  }};
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 36px 32px;
  height: ${({ connected }) => {
    if (connected) {
      return '495px'
    }
    return '328px'
  }};
`

const PlusIcon = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const StakingPanel: FunctionComponent = () => {
  const { account } = useWeb3React()

  const balance = useBalance()

  const dispatch = useDispatch()

  return (
    <>
      {!account && (
        <HeaderPanel>
          <Title>Stake KCS</Title>
          <Desc>Stake KCS and receive stKCS as proof while staking</Desc>
        </HeaderPanel>
      )}
      <ContentWrap connected={Boolean(account)}>
        <RowCenterBox>
          <DataItem
            title="Available to stake"
            balance="2.00 KCS"
            titleExtra={
              <ExternalLink
                style={{ marginLeft: '10px' }}
                url="https://app.mojitoswap.finance/swap"
                name="Get more KCS"
              />
            }
          />
        </RowCenterBox>
        {!account ? (
          <>
            <RowCenterBox align="flex-start" justify="space-between" style={{ marginTop: '24px', width: '300px' }}>
              <DataItem title="Staked amount" balance="0.00 sKCS" uBalance="≈$0.0026" />
              <DataItem
                title="APR"
                titleExtra={
                  <Tooltip
                    placement="top"
                    title="APR is denominated in terms of sKCS, not USD. The calculation is based on the sKCS/KCS exchange rate 2 days ago, it is not compounded and is not a guaranteed or promised return or profit.APR = (exchange price 48 hours ago - exchange price at this time)*180*100%"
                  >
                    <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                  </Tooltip>
                }
                balance="3.5%"
              />
            </RowCenterBox>
          </>
        ) : (
          <>
            <RowCenterBox style={{ marginTop: '32px' }}>
              <DataItem
                title="Staked amount"
                balance="10.00 sKCS"
                uBalance="≈$400.0026"
                balanceExtra={
                  <Tooltip placement="top" title="Add token to wallet">
                    <PlusIcon src={require('../../../assets/images/Icons/plus.png').default} alt="add-token-icon" />
                  </Tooltip>
                }
              />
            </RowCenterBox>
            <RowCenterBox align="flex-start" justify="space-between" style={{ marginTop: '32px', width: '300px' }}>
              <DataItem
                title="Pending amount"
                balance="10.00 KCS"
                uBalance="≈$400.0026"
                titleExtra={
                  <Tooltip
                    placement="top"
                    title="Pending amount means the stKCS unstaking is under processing, the period takes around 3-6 days to process, you can withdraw it after that."
                  >
                    <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                  </Tooltip>
                }
              />
              <DataItem
                title="APR"
                titleExtra={
                  <Tooltip
                    placement="top"
                    title="APR is denominated in terms of sKCS, not USD. The calculation is based on the sKCS/KCS exchange rate 2 days ago, it is not compounded and is not a guaranteed or promised return or profit. APR = (exchange price 48 hours ago - exchange price at this time)*180*100%"
                  >
                    <QuestionCircleOutlined style={{ color: '#B4B7C1' }} />
                  </Tooltip>
                }
                balance="3.5%"
              />
            </RowCenterBox>

            <RowCenterBox align="center" justify="space-between" style={{ marginTop: '32px', width: '100%' }}>
              <DataItem title="Available withdraw amount" balance="10.00 KCS" uBalance="≈$400.0026" />
              <StyledButton style={{ width: '232px' }}>Withdraw</StyledButton>
            </RowCenterBox>
          </>
        )}

        {!account && (
          <StyledButton
            style={{ marginTop: '32px' }}
            onClick={() => {
              dispatch(toggleConnectWalletModalShow({ show: true }))
            }}
          >
            Connect Wallet
          </StyledButton>
        )}
      </ContentWrap>
    </>
  )
}

export default StakingPanel
