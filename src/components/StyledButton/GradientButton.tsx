import { GradientBgColor } from 'components'
import React from 'react'
import styled from 'styled-components'
import { Button, ButtonProps } from 'antd'

const GradientButtonWarp = styled.div`
  position: relative;
  border: none;
  box-shadow: none;
  overflow: hidden;
  cursor: pointer;
  ${GradientBgColor}
  &:hover {
    ${GradientBgColor}
  }
  margin-top: 10px;
  height: 48px;
  border-radius: 30px;
`

const GradientButtonBg = styled.div`
  position: absolute;
  width: calc(100% - 2px);
  height: 46px;
  left: 1px;
  top: 1px;
  background: #000;
  border-radius: 31px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GradienButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <>
      <GradientButtonWarp>
        <GradientButtonBg>{props.children}</GradientButtonBg>
      </GradientButtonWarp>
    </>
  )
}

export default GradienButton
