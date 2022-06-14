import { Spin } from 'antd'
import React from 'react'
import styled from 'styled-components'
export interface FullLoadingProps {}

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FullLoading: React.FunctionComponent<FullLoadingProps> = () => {
  return (
    <Wrap>
      <Spin />
    </Wrap>
  )
}

export default FullLoading
