import { ModalProps } from 'antd'
import { Image, RawBox, RowCenterBox, ColumnCenterBox } from 'components'
import StyledModal from 'components/StyledModal'
import HashLink from 'components/Transaction/HashLink'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import StyledButton from '../../../components/StyledButton/index'

const TipText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #040a2d;
  margin-top: 12px;
  margin-bottom: 8px;
`

const SuccessModal: React.FunctionComponent<ModalProps & { setModalList: any; hash: string }> = (props) => {
  const history = useHistory()

  return (
    <StyledModal {...props} width="440px">
      <RawBox style={{ marginTop: '24px', width: '100%' }}>
        <ColumnCenterBox style={{ margin: '48px 0' }}>
          <Image
            src={require('../../../assets/images/Icons/success.png').default}
            width="48px"
            height="48px"
            alt="success-icon"
          />
          <TipText>Voted Successful</TipText>
          <HashLink hash={props.hash} />
        </ColumnCenterBox>
      </RawBox>
      <RowCenterBox style={{ width: '100%' }}>
        <StyledButton
          onClick={() => {
            props.setModalList((list) => {
              return { ...list, successModalShow: false }
            })
            history.push('/my-vote')
          }}
        >
          Check My Vote
        </StyledButton>
      </RowCenterBox>
    </StyledModal>
  )
}

export default SuccessModal
