import React from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../../constants/theme'
export interface DotComponentProps {
  color?: string
  width?: string
  shining?: boolean
}

const shining = keyframes`
    0% {
      transform:scale(0.8);
      box-shaow:1px 1px 1px #fff;
    }
    50% {
      transform:scale(1.2);
        box-shaow:1px 1px 10px ${theme.colors.primary};
    }
    100% {
      transform:scale(0.8);
       box-shaow:1px 1px 1px #fff;
    }
  `
const shining2 = keyframes`
    0% {
      box-shaow:1px 1px 1px #fff;
    }
    50% {
        box-shaow:1px 1px 10px ${theme.colors.primary};
    }
    100% {
       box-shaow:1px 1px 1px #fff;
    }
  `
const DotComponent: React.FunctionComponent<DotComponentProps> = (props) => {
  const animation = props.shining ? shining : shining2
  const DotWrap = styled.div`
    width: ${() => props.width ?? '12px'};
    height: ${() => props.width ?? '12px'};
    background: ${() => props.color ?? '#49FFA1'};
    border-radius: 50%;
    animation: ${animation} 1s ease-in-out infinite;
  `
  return <DotWrap />
}

export default DotComponent
