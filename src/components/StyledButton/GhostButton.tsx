import { Button, ButtonProps } from 'antd'
import styled from 'styled-components'

const StyledButtonWrap = styled(Button)`
  width: 100%;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  color: #00d092 !important;
  border: 1px solid #00d092 !important;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.8 !important;
    box-shadow: none;
  }
`

const GhostButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <StyledButtonWrap {...props} ghost disabled={props.disabled} loading={props.loading}>
      {props.children}
    </StyledButtonWrap>
  )
}

export default GhostButton
