// style = 'opacity: 1; transform: matrix(0.891949, 0, 0, 0.891949, 31.255, -6.6);'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const purpleAnimation = keyframes`
  0%{
    transform:translateX(0px);
  }

  50%{
     transform:translateX(-100px);
  }

  100%{
    transform:translateX(0px);
  }
`

const greenAnimation = keyframes`
  0%{
    transform:translateX(0px);
  }

  50%{
     transform:translateX(-180px);
  }

  100%{
    transform:translateX(0px);
  }
`

const CircleWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  @media (max-width: 768px) {
    display: none;
  }
`

const GreenCircle = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  right: 432px;
  top: 367px;
  background: #5aefc2;
  filter: blur(500px);
  animation: ${greenAnimation} 14s infinite ease;
  z-index: 0;
`

const PurpleCircle = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  right: 100px;
  top: 164px;
  background: #ab84ff;
  filter: blur(500px);
  animation: ${purpleAnimation} 12s infinite ease;
`

const DanamicCenterBg: React.FunctionComponent = () => {
  return (
    <CircleWrap>
      <GreenCircle />
      <PurpleCircle />
    </CircleWrap>
  )
}

export default DanamicCenterBg
