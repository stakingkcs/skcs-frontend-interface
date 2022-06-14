import { Modal, ModalProps } from 'antd'
import { Image } from 'components'
import styled from 'styled-components'

import './index.less'

const ModalWrap = styled.div``

const ModalHeaderWrap = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const CloseIcon = styled(Image)`
  width: 18px;
  height: 18px;
  cursor: pointer;
`
const Title = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #040a2d;
`

const ModalContnet = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const StyledModal: React.FunctionComponent<ModalProps> = (props) => {
  return (
    <Modal
      {...props}
      footer={null}
      title={null}
      closable={false}
      style={{ borderRadius: '20px' }}
      bodyStyle={{ borderRadius: '20px' }}
    >
      <ModalWrap>
        <ModalContnet>
          <ModalHeaderWrap>
            <Title>{props.title ?? 'Modal'}</Title>
            <CloseIcon
              src={require('../../assets/images/Icons/close.png').default}
              alt="close-icon"
              onClick={props.onCancel}
            />
          </ModalHeaderWrap>
          {props.children}
        </ModalContnet>
      </ModalWrap>
    </Modal>
  )
}

export default StyledModal
