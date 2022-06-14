import React from 'react'
import styled from 'styled-components'
import Row from '../Row'
import { ParagraphText } from '../Common/index'
import { useTranslation } from 'react-i18next'

export interface PictureProps {
  url: string
  width?: string
  description: string
  direction: string
}

const PictureWrap = styled(Row)<{ direction: string }>`
  align-items: center;
  justify-content: ${({ direction }) => (direction === 'left' ? 'space-between' : 'space-between')};
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
`
const ImageDescription = styled(ParagraphText)<{ direction: string }>`
  order: ${({ direction }) => (direction === 'left' ? 1 : 2)};
  width: auto;
  max-width: 480px;
  text-align: left;
  font-size: 20px;
  padding-left: ${({ direction }) => (direction === 'left' ? '0px' : '80px')};
  @media (max-width: 768px) {
    font-size: 16px;
    padding-left: ${({ direction }) => (direction === 'left' ? '0px' : '16px')};
    padding-right: ${({ direction }) => (direction === 'right' ? '0px' : '16px')};
  }
`

const Image = styled.img<{ width: string; direction: string }>`
  width: ${({ width }) => width};
  order: ${({ direction }) => (direction === 'left' ? 2 : 1)};
`

const SloganPicture: React.FunctionComponent<PictureProps> = (props) => {
  const { t } = useTranslation()
  return (
    <PictureWrap direction={props.direction}>
      <Image src={props.url} width={props.width ?? '240px'} direction={props.direction}></Image>
      <ImageDescription direction={props.direction}>{t(`${props.description}`)}</ImageDescription>
    </PictureWrap>
  )
}

export default SloganPicture
