import { Button, ButtonProps } from 'antd'
import styled from 'styled-components'

const StyledButtonWrap = styled(Button)<{ disabled?: boolean; loading: boolean }>`
  width: 100%;
  height: 40px;
  background: ${({ disabled, loading }) => {
    if (disabled) {
      return '#B4B7C1 !important'
    }
    if (loading) {
      return '#fff !important'
    }
    return '#00d092 !important'
  }};
  border: ${({ disabled, loading }) => {
    if (loading) {
      return '1px solid #00d092 !important'
    }
    if (disabled) {
      return '1px solid #B4B7C1 !important'
    }
    return 'none !important'
  }};

  color: ${({ disabled, loading }) => {
    if (loading) {
      return '#00d092 !important'
    }
    return '#fff !important'
  }};
  border-radius: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: #00d092;
    font-weight: bold;
    box-shadow: none;
  }
`

const StyledButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <StyledButtonWrap {...props} disabled={props.disabled} loading={Boolean(props.loading)}>
      {props.children}
    </StyledButtonWrap>
  )
}

export default StyledButton
