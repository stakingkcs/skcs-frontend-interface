import { Image } from 'components'
import React from 'react'

import styled from 'styled-components'

interface Props {
  AToken: string
  BToken: string
}

const ImageWrap = styled.div`
  width: 84px;
  height: 48px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const AImageWrap = styled.div`
  position: relative;
  z-index: 0;
`
const BImageWrap = styled.div`
  position: relative;
  z-index: 1;
  left: -16px;
`

const DoubleTokenLogo: React.FunctionComponent<Props> = ({ AToken, BToken }) => {
  return (
    <ImageWrap>
      <AImageWrap>
        <Image src={AToken} width="48px" height="48px" alt="atoken-icon" />
      </AImageWrap>
      <BImageWrap>
        <Image src={BToken} width="48px" height="48px" alt="atoken-icon" />
      </BImageWrap>
    </ImageWrap>
  )
}

export default DoubleTokenLogo
