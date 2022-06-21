import { useWeb3React } from '@web3-react/core'
import { ModalProps } from 'antd'
import { ColumnCenterBox, RawBox, Text } from 'components'
import ModalDescription from 'components/ModalDescription'
import StyledInput from 'components/StyledInput'
import StyledModal from 'components/StyledModal'
import { formatEther } from 'ethers/utils'
import React from 'react'
import { useAppDispatch } from 'state'
import { useBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import { updateBalance } from 'utils/wallet'
import StyledButton from '../../../components/StyledButton/index'
import { MOJITOSWAP_SWAP_URL } from '../../../constants/index'
import { validatorContractHelper } from '../../../utils/validator'
import { useStakerContract } from '../../../hooks/useContract'
import { fetchStakerPublicData } from '../../../state/staker/fetchStaker'
import { StakerState } from '../../../state/types';

const ModalWrap = styled.div`
  padding: 23px 20px;
`

const DescriptionText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #7f8393;
`

const BuyLink = styled.a`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #00d092;
  margin-top: 16px;
  width: 100%;
  text-align: center;
  &:hover {
    color: #00d092;
  }
`

const VoteModal: React.FunctionComponent<ModalProps & { validator: StakerState; setHash: any } & { setModalList: any }> = ({
  validator,
  ...props
}) => {
  const initError = {
    hasError: true,
    errorInfo: '',
  }
  const [error, setError] = React.useState<typeof initError>(initError)
  const [voteLoading, setVoteLoading] = React.useState<boolean>(false)
  const [voteKCS, setVoteKCS] = React.useState<string>('')

  const balance = useBalance()

  const dispatch = useAppDispatch()

  const validatorContract = useStakerContract()

  const { library, account, chainId } = useWeb3React()

  React.useEffect(() => {
    if (library && chainId && account) {
      updateBalance(library, account)
    }
  }, [library, account, chainId])

  const handleVote = React.useCallback(async () => {
    props.setHash(() => '')
    setVoteLoading(() => true)
    // try {
    //   const response = await validatorContractHelper.voteForValidator(
    //     validatorContract,
    //     validator.address,
    //     Number(voteKCS)
    //   )
    //   if (response.status) {
    //     console.log('response.data', response.data)
    //     props.setHash(() => response.data?.transactionHash)
    //     setTimeout(() => {
    //       if (response.data?.status === 1) {
    //         dispatch(fetchStakerPublicData())
    //         props.setModalList((list) => {
    //           return { ...list, voteModalShow: false, successModalShow: true }
    //         })
    //         updateBalance(library, account as any)
    //       } else {
    //         props.setModalList((list) => {
    //           return { ...list, voteModalShow: false, failModalShow: true }
    //         })
    //       }
    //     }, 1)
    //   } else {
    //     props.setModalList((list) => {
    //       return { ...list, voteModalShow: false, failModalShow: true }
    //     })
    //   }
    // } finally {
    //   setVoteLoading(() => false)
    // }
  }, [setVoteLoading, props, dispatch, voteKCS, validatorContract])

  return (
    <StyledModal {...props} width="440px">
      <ModalDescription>
        <RawBox style={{ marginLeft: '18px' }}>
          <DescriptionText>
            1 KCS represents 1 vote, the vote amount only accepts enter integers, please reserve at least 0.01 KCS as
            gas fee.
          </DescriptionText>
          <DescriptionText style={{ marginTop: '6px' }}>
            You can redeem votes on "My Vote" page, the redemption of votes must be locked in about 3 days before
            receiving.
          </DescriptionText>
        </RawBox>
      </ModalDescription>

      <RawBox style={{ marginTop: '24px', width: '100%' }}>
        <Text fontSize="14px">Vote</Text>
        <StyledInput
          style={{ marginTop: '12px' }}
          error={error}
          maxLimit={balance ? formatEther(balance) : '0'}
          checkBalance={true}
          setError={setError}
          setVaule={setVoteKCS}
        />
        <Text fontSize="14px">Available Balance: {balance ? formatEther(balance) + ' KCS' : '-'}</Text>
      </RawBox>

      <ColumnCenterBox style={{ marginTop: '20px' }}>
        <StyledButton disabled={!account || error.hasError} loading={voteLoading} onClick={handleVote}>
          Vote
        </StyledButton>
        <BuyLink href={MOJITOSWAP_SWAP_URL} target="_blank">
          Buy KCS
        </BuyLink>
      </ColumnCenterBox>
    </StyledModal>
  )
}

export default VoteModal
