import React from 'react'
import { Input, InputProps } from 'antd'
import styled from 'styled-components'
import BN from 'bignumber.js'

import './index.less'
import { useBalance } from '../../state/wallet/hooks'

const StyledInputWrap = styled.div`
  width: 100%;
  height: auto;
  margin: 12px 0;
`

const SInput = styled(Input)`
  background: #ffffff;
  border: 1px solid #dbdbe6;
  border-radius: 4px;
`

const ErrorInfo = styled.div`
  margin: 12px 0;
  color: red;
`

const SuffixText = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #7f8393;
`

interface Props {
  setVaule: any
  error: { hasError: boolean; errorInfo: string }
  setError: any
  maxLimit: string
  checkBalance?: boolean
}

const StyledInput: React.FunctionComponent<InputProps & Props> = (props) => {
  const balance = useBalance()

  React.useEffect(() => {
    if (props.checkBalance && new BN(balance).div(10 ** 18).lte(1)) {
      props.setError(() => {
        return { hasError: true, errorInfo: 'Insufficient balance' }
      })
    }
  }, [balance, props.checkBalance])

  const checkValue = (input) => {
    const value = input.target.value?.trim()

    props.setError(() => {
      return { hasError: false, errorInfo: '' }
    })

    if (value === '') {
      props.setError(() => {
        return { hasError: true, errorInfo: '' }
      })
      return
    }

    const Reg = /^[1-9][0-9]*$/

    if (!Reg.test(value)) {
      props.setError(() => {
        return { hasError: true, errorInfo: 'Invalid enterger amount and at least enter 1.' }
      })
      return
    }

    if (props.maxLimit && Number(value) > Number(props.maxLimit)) {
      props.setError(() => {
        return { hasError: true, errorInfo: "Don't exceed the maximum amount and at least enter 1." }
      })
      return
    }

    props.setVaule(() => Number(value))
  }

  return (
    <StyledInputWrap>
      <SInput
        type="number"
        onChange={checkValue}
        width="100%"
        height="40px"
        size="large"
        placeholder="Please enter an integer amount"
        suffix={<SuffixText>KCS</SuffixText>}
      />
      {props.error.hasError && props.error.errorInfo && <ErrorInfo>{`* ${props.error.errorInfo}`}</ErrorInfo>}
    </StyledInputWrap>
  )
}

export default StyledInput
