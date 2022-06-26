import { RowCenterBox } from 'components'
import React, { CSSProperties, ReactElement } from 'react'
import styled from 'styled-components'

const DataItemWrap = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #b4b7c1;
`

const Desc = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
`

interface Props {
  title: ReactElement | string
  content: ReactElement | string
  style?: CSSProperties
  tstyle?: CSSProperties
  dstyle?: CSSProperties
}

const RowData: React.FunctionComponent<Props> = ({ content, title, style, tstyle, dstyle }) => {
  return (
    <DataItemWrap style={style}>
      <Title style={tstyle}>{title}</Title>
      <Desc style={dstyle}>{content}</Desc>
    </DataItemWrap>
  )
}

export default RowData
