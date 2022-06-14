import { CenterBox, Image } from 'components'
import React from 'react'
import styled from 'styled-components'

const DescriptionWrap = styled.div`
  background: rgba(0, 208, 146, 0.1);
  border-radius: 12px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 18px;
  margin-top: 18px;
`

const ModalDescription: React.FunctionComponent = ({ children }) => {
  return (
    <DescriptionWrap>
      <CenterBox style={{ width: '40px' }}>
        <Image src={require('../../assets/images/Icons/info.png').default} width="24px" height="24px" alt="info-icon" />
      </CenterBox>
      {children}
    </DescriptionWrap>
  )
}

export default ModalDescription
