import { Button, ButtonProps } from 'antd'
import styled from 'styled-components'

const StyledButtonWrap = styled(Button)<{ disabled?: boolean; loading: boolean }>`
  width: 100%;
  height: 56px;
  background: linear-gradient(90.14deg, #00d092 -4.82%, #d04aff 113.33%);
  outline: none;
  box-shadow: none;
  color: #fff;
  border: none !important;
  border-radius: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  &:hover {
    background: linear-gradient(90.14deg, #00d092 -4.82%, #d04aff 113.33%) !important;
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
