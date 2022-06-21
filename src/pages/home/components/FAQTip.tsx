import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import {Title} from '../../../components/index'

const FAQWarp = styled.div`
    width: 507px;
`

const TipWarp = styled.div`
    width: 507px;
    height: 134px;
    background: rgba(29, 28, 36, 1);
    color: #ffffff;
    border-radius: 16px;
    padding: 32px;
    font-family: Arial;
`

const QuesTitle = styled.p`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 0;
`
const Desc = styled.p`
    font-size: 16px;
    font-weight: normal;
    color: rgba(180, 183, 193, 1);
`


interface Props {
    title: string
    desc?: string
  }

const FAQTip:FunctionComponent<Props>= ({title, desc}) => {
    return (
        <FAQWarp>
        <Title style={{fontSize: '32px', margin: '0 0 25px 0', textAlign: 'left'}}>FAQ</Title>
        <TipWarp>
            <QuesTitle>{title} </QuesTitle>
            <Desc>{desc}</Desc>
        </TipWarp>
        </FAQWarp>
    )
}

export default FAQTip