import styled from 'styled-components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RowCenterBox } from 'components'
import { Image } from 'components'
import { useResponsive } from 'utils/responsive'

type Props = {
  title: string
}

const ImageWrap = styled.div``

const TitleText = styled.h2`
  font-family: 'Hiragino Kaku Gothic StdN';
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  display: flex;
  align-items: center;
  background: linear-gradient(93.69deg, #41e6af 0.42%, #b65cf1 82.72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin: 0;
  padding: 0;
  margin-left: 16px;
`

const SKCSWinTitle: React.FunctionComponent<Props> = ({ title }) => {
  const { isMobile } = useResponsive()
  return (
    <RowCenterBox>
      <ImageWrap>
        <Image
          src={require('../../../assets/images/skcswin/title-icon.png').default}
          width="32px"
          height="40px"
          alt="title-icon"
        />
      </ImageWrap>
      <TitleText>{title}</TitleText>
      {isMobile && (
        <ImageWrap>
          <Image
            src={require('../../../assets/images/skcswin/title-icon.png').default}
            width="32px"
            height="40px"
            alt="title-icon"
          />
        </ImageWrap>
      )}
    </RowCenterBox>
  )
}

export default SKCSWinTitle
