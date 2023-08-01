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
  height: 100vh;
  position: absolute;
  z-index: -1;
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
  right: 332px;
  top: 367px;
  background: #5aefc2;
  filter: blur(200px);
  animation: ${greenAnimation} 14s infinite ease;
  z-index: 0;
`

const PurpleCircle = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  right: 154px;
  top: 164px;
  background: #a187f3;
  filter: blur(200px);
  animation: ${purpleAnimation} 12s infinite ease;
`

const DanamicBg: React.FunctionComponent = () => {
  return (
    <CircleWrap>
      <GreenCircle />
      <PurpleCircle />
    </CircleWrap>
  )
}

export default DanamicBg
