import { ModalProps } from 'antd'
import BN from 'bignumber.js'
import { Image, RawBox, RowCenterBox, Text } from 'components'
import StyledModal from 'components/StyledModal'
import Copy from 'copy-to-clipboard'
import React from 'react'
import { Pool } from 'state/types'
import styled from 'styled-components'
import StyledButton from '../../../components/StyledButton/index'
import { MOJITOSWAP_SWAP_URL } from '../../../constants/index'
import { RowBetween } from 'components/Row'
import { useResponsive } from '../../../utils/responsive'
import { ValidatorStatus } from '../../../constants/types'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { toggleConnectWalletModalShow } from 'state/wallet/actions'
import ModalDescription from 'components/ModalDescription'
import WarningDescription from '../../../components/WarningDescription/index'
import StyledNotification from 'components/StyledNotification'

const DescriptionWrap = styled.div`
  margin-top: 14px;
  width: 100%;
  height: auto;
  background: #efeff2;
  border-radius: 8px;
  padding: 16px;
`

const DescriptionText = styled.div<{ unfold: boolean }>`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: column nowrap;
  color: #7f8393;
  overflow: hidden;
  text-overflow: ellipsis;
  height: ${({ unfold }) => {
    if (unfold) {
      return 'auto'
    }
    return '64px'
  }};
  @media (max-width: 768px) {
    padding-top: 8px;
    margin-top: 8px;
    height: ${({ unfold }) => {
      if (unfold) {
        return 'auto'
      }
      return '60px'
    }};
  }
`
const DescriptionTitle = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #494e67;
  height: 20px;
`

const BuyLink = styled.a`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  height: 36px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #00d092;
  width: 100%;
  text-align: center;
  border: 1px solid #00d092;
  border-radius: 18px;
  margin-right: 12px;
  &:hover {
    color: #00d092;
  }
`

const Title = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  display: flex;
  align-items: center;
  color: #040a2d;
`
const WebsiteText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #00d092;
  width: auto;
  padding: 10px 20px;
  height: 20px;
  margin-left: 8px;
  border: 1px solid #00d092;
  border-radius: 18px;
  cursor: pointer;
`

const OperateText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #00d092;
  margin-top: 4px;
  cursor: pointer;
`

const Card = styled.div`
  width: 100%;
  background: #efeff2;
  border-radius: 8px;
  padding: 16px 20px;
`
const WarningText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: #fb6491;
`

const ValidatorModal: React.FunctionComponent<
  ModalProps & { validator: Pool & { percent: number } } & { setModalList: any }
> = (props) => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const [unfold, setUnfold] = React.useState<boolean>(false)
  const { isMobile } = useResponsive()

  React.useEffect(() => {
    console.log(props)
  }, [props])

  const Header = () => {
    return (
      <RowCenterBox style={{ width: '100%' }}>
        <Title>{props.validator.name}</Title>
        {props.validator.website && (
          <WebsiteText
            onClick={() => {
              window.open(props.validator.website, '_blank')
            }}
          >
            Official Website
          </WebsiteText>
        )}
      </RowCenterBox>
    )
  }

  return (
    <StyledModal title={<Header />} {...props} width="440px">
      <Text fontSize="14px" mt="15px" color="#040A2D">
        Contract address
      </Text>
      <RawBox style={{ marginTop: '5px', width: '100%' }}>
        <RowCenterBox
          style={
            isMobile ? { background: '#EFEFF2', borderRadius: '8px', padding: '11px 14px' } : { cursor: 'pointer' }
          }
          onClick={() => {
            Copy(props.validator.address)
            StyledNotification.success({
              message: 'Notification',
              description: 'Copied!',
            })
          }}
        >
          <Text fontSize="14px" marginRight="6px" ellipsis={isMobile ? true : false}>
            {props.validator.address}
          </Text>
          <Image
            src={require('../../../assets/images/Icons/copy.png').default}
            width="18px"
            height="18px"
            alt="copy-icon"
          />
        </RowCenterBox>
      </RawBox>
      <RowCenterBox style={{ marginTop: '12px', width: '100%' }}>
        <Card>
          <RowBetween>
            <RawBox>
              <Text style={{ width: '110px' }} fontSize="14px" color="#7F8393">
                Current Ranking
              </Text>
              <Text fontSize="18px" color="#040A2D" marginTop="8px" fontWeight={500}>
                {props.validator?.rank}
              </Text>
            </RawBox>
            <RawBox style={{ marginLeft: '16px' }}>
              <Text fontSize="14px" color="#7F8393">
                APR
              </Text>
              <Text fontSize="18px" color="#040A2D" marginTop="8px" fontWeight={500}>
                {`${props.validator?.apr}%`}
              </Text>
            </RawBox>
          </RowBetween>
          <Text fontSize="14px" color="#7F8393" mt="15px">
            Votes/ Proportion
          </Text>
          <Text fontSize="18px" color="#040A2D" marginTop="8px" fontWeight={500}>
            {new BN((props?.validator && props.validator?.votes?.toString()) ?? 0).toFormat({
              groupSeparator: ',',
              groupSize: 3,
            })}
            /{props.validator?.percent}%
          </Text>
        </Card>
      </RowCenterBox>
      <DescriptionWrap>
        <DescriptionTitle>Introduction</DescriptionTitle>
        <DescriptionText unfold={unfold}>
          This is a leading Staking and Masternode hosting platform that provides secure and convenient hosting services
          while managing close to a billion dollars in assets and the highest number of nodes globally. As one of
          dollars in assets and the highest number of nodesThis is a leading Staking and Masternode hosting platform
          that provides secure and convenient hosting services while managing close to a billion dollars in assets and
          the highest number of nodes globally. As one of dollars in assets and the highest number of nodes.
        </DescriptionText>
        <OperateText onClick={() => setUnfold((old) => !old)}>{unfold ? 'Unfold' : 'Read more'}</OperateText>
      </DescriptionWrap>
      {props.validator.status === ValidatorStatus['In Jail'] && (
        <WarningDescription>
          <RawBox style={{ marginLeft: '18px' }}>
            <WarningText>This validator is "In Jail" for bad behavior and does not support being voted.</WarningText>
          </RawBox>
        </WarningDescription>
      )}

      <RowCenterBox style={{ marginTop: '24px', width: '100%' }}>
        {/* <BuyLink href={MOJITOSWAP_SWAP_URL} target="_blank">
          Share
        </BuyLink> */}
        {!account && (
          <StyledButton
            onClick={() => {
              dispatch(toggleConnectWalletModalShow({ show: true }))
              props.setModalList((list) => {
                return { ...list, validatorModalShow: false }
              })
            }}
          >
            Connect Wallet
          </StyledButton>
        )}

        {account && props.validator.status !== ValidatorStatus['In Jail'] && (
          <StyledButton
            onClick={() => {
              props.setModalList((list) => {
                return { ...list, validatorModalShow: false, voteModalShow: true }
              })
            }}
          >
            Vote
          </StyledButton>
        )}

        {account && props.validator.status === ValidatorStatus['In Jail'] && (
          <StyledButton disabled={true} style={{ marginTop: '-10px' }}>
            Vote
          </StyledButton>
        )}
      </RowCenterBox>
    </StyledModal>
  )
}

export default ValidatorModal
