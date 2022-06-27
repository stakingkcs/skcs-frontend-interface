import React from 'react'
import styled from 'styled-components'

const walletFile = require('../../../assets/images/home/walletfile.png').default
const exlink = require('../../../assets/images/home/ex_link.png').default
const Title = styled.div`
  font-family: 'Arial';
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #ffffff;
  margin: 20px  0;
  /* @media (max-width: 768px) {
    font-size: 26px;
    margin: 0 8px;
  } */
`

const Warp = styled.div`
  width: 383px;
  height: 102px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  border-radius: 20px;
  padding: 21px 24px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 343px;
    padding: 21px 16px;
  }
`
const IconWarp = styled.div`
  background: linear-gradient(120.14deg, #0DC898 -4.82%, #B65CF2 113.33%);
  width: 56px;
  height: 56px;
  border-radius: 28px;
`
const Icon = styled.img`
  object-fit: contain;
`

const BanlanceWarp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const BanlanceText = styled.p`
  font-family: Arial;
  font-size: 16px;
  line-height: 24px;
  color: #b4b7c1;
`

const BanlanceNum = styled.p`
  font-family: Arial;
  font-size: 24px;
  line-height: 24px;
  color: #ffffff;
  font-weight: bold;
`
const LinkWarp = styled.div`
  display: flex;
`
const LinkText = styled.p`
  font-family: Arial;
  font-size: 16px;
  color: #d04aff;
  margin-right: 8px;
  line-height: 18px;
`
const LinkIcon = styled.img`
  width: 16px;
  height: 16px;

`

const Banlance: React.FunctionComponent = () => {
  return (
    <>
      <Warp>
        <IconWarp>
        <Icon src={walletFile}/>
        </IconWarp>
        <BanlanceWarp>
          <BanlanceText>Current balance</BanlanceText>
          <BanlanceNum>38,275 sKCS</BanlanceNum>
        </BanlanceWarp>
        <LinkWarp>
          <LinkText>Get sKCS</LinkText>
          <LinkIcon src={exlink} />
        </LinkWarp>
      </Warp>
    </>
  )
}
export default Banlance
