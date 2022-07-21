import React, { CSSProperties } from 'react'
import styled from 'styled-components'
import { Image } from 'components'
const ExtraTitle = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  align-items: center;
  color: #00d092;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  margin-top: 8px;
`
interface Props {
  url: string
  name: string
  style?: CSSProperties
}

const GreenExternalLink: React.FunctionComponent<Props> = ({ url, name, style }) => {
  return (
    <ExtraTitle
      style={style}
      onClick={() => {
        window.open(url, '_blank')
      }}
    >
      <div style={{ marginRight: '6px' }}>{name}</div>
      <Image
        src={require('../../assets/images/Icons/share-green.png').default}
        width="16px"
        height="16px"
        alt="link-icon"
      />
    </ExtraTitle>
  )
}

export default GreenExternalLink
