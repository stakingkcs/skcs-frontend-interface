import { ButtonProps } from 'antd'
import { GradientBgColor } from 'components'
import React from 'react'
import styled from 'styled-components'

const GradientButtonWarp = styled.div`
  position: relative;
  border: none;
  box-shadow: none;
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
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GradienButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <GradientButtonWarp>
      <GradientButtonBg onClick={props.onClick}>{props.children}</GradientButtonBg>
    </GradientButtonWarp>
  )
}

export default GradienButton
