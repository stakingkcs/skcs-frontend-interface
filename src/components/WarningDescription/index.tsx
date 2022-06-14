import { CenterBox, Image } from 'components'
import React from 'react'
import styled from 'styled-components'

const DescriptionWrap = styled.div`
  background: rgba(251, 100, 145, 0.2);
  border-radius: 8px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 18px;
  margin-top: 18px;
`

const WarningDescription: React.FunctionComponent = ({ children }) => {
  return (
    <DescriptionWrap>
      <CenterBox style={{ width: '40px' }}>
        <Image
          src={require('../../assets/images/Icons/warning.png').default}
          width="24px"
          height="24px"
          alt="warning-icon"
        />
      </CenterBox>
      {children}
    </DescriptionWrap>
  )
}

export default WarningDescription
