import React from 'react'
import styled from 'styled-components'
import { RawBox, Image, RowCenterBox, ColumnCenterBox } from '../../../components/index'

const StepsWrap = styled.div`
  width: 100%;
  height: auto;
  padding: 80px 0 140px 0;
  @media (max-width: 768px) {
    padding-top: 8px;
  }
`

const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

const Title = styled.div`
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  @media (max-width: 768px) {
    max-width: 300px;
    font-size: 24px;
    text-align: center;
  }
`

const ImageWrap = styled.div`
  width: 280px;
  height: 88px;
  background: #080e2d;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 53px;
`

const Audit: React.FunctionComponent = () => {
  return (
    <StepsWrap>
      <Content>
        <Title>Audit institutions</Title>
        <ImageWrap>
          <Image
            src={require('../../../assets/images/home/peckshield.png').default}
            width="227px"
            height="75px"
            alt="audit-image"
            onClick={() =>
              window.open(
                'https://github.com/kcc-community/kcc-genesis-contracts/raw/055d1fa224b1203a2c587bde6bfbc1cd90f78981/audit/PeckShield-Audit-Report-KCC-v1.1.0.pdf',
                '_blank'
              )
            }
          />
        </ImageWrap>
      </Content>
    </StepsWrap>
  )
}

export default Audit
