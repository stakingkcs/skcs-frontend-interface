import styled, { css } from 'styled-components'
import Text from './Text'

export { Text }

export const RawBox = styled.div`
  box-sizing: border-box;
  width: 100%;
`

export const FlexBox = styled.div`
  display: flex;
  width: 100%;
`

export const Image = styled.img``

export const ColumnCenterBox = styled(FlexBox)<{ align?: string }>`
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: ${({ align }) => align ?? 'center'};
`

export const RowCenterBox = styled(FlexBox)<{ align?: string; justify?: string }>`
  flex-flow: row nowrap;
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  align-items: ${({ align }) => align ?? 'center'};
`

export const BetweenBox = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
`

export const CenterBox = styled(FlexBox)<{ dir?: string }>`
  flex-flow: ${({ dir }) => dir ?? 'column'} nowrap;
  justify-content: center;
  align-items: center;
`

export const GradientBgColor = css`
  background: linear-gradient(90.14deg, #00d092 -4.82%, #d04aff 113.33%) !important;
`


export const Title = styled.div`
font-family: 'Arial';
font-style: normal;
font-weight: bold;
font-size: 40px;
text-align: center;
color: #ffffff;
margin: 160px 0 60px;
/* @media (max-width: 768px) {
  font-size: 26px;
  margin: 0 8px;
} */
`