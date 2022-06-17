import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { Title } from '../../../components/index'

const FollowWarp = styled.div`
  width: 444px;
  margin-left: 60px;
`
const TipWarp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const Desc = styled.p`
  font-size: 16px;
  font-weight: normal;
  color: rgba(180, 183, 193, 1);
`
const IconWarp = styled.div`
  display: flex;
  justify-content: space-between;
`
const ItemImg = styled.img`
  object-fit: cover;
  transition: all 0.3s ease-in;
`
const ItemLink = styled.a`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  text-align: center;
  line-height: 72px;
  transition: all 0.3s ease-in;
  background: #1c1c24;
  &:hover {
    background: linear-gradient(120.14deg, #00d092 -4.82%, #d04aff 113.33%);
  }
  &:hover ${ItemImg} {
    transform: scale(0.9);
  }
`

const followList = [
  {
    icon: require('../../../assets/images/home/f1.png').default,
    link: '',
  },
  {
    icon: require('../../../assets/images/home/f2.png').default,
    link: '',
  },
  {
    icon: require('../../../assets/images/home/f3.png').default,

    link: '',
  },
  {
    icon: require('../../../assets/images/home/f4.png').default,
    link: '',
  },
]

const FollowUs: FunctionComponent = () => {
  return (
    <FollowWarp>
      <Title style={{ fontSize: '32px', margin: '0 0 25px 0', textAlign: 'left' }}>Follow Us</Title>
      <TipWarp>
        <Desc>Click media icon to follow us</Desc>
        <IconWarp>
          {followList.map((item) => {
            return (
              <ItemLink>
                <ItemImg src={item.icon} />
              </ItemLink>
            )
          })}
        </IconWarp>
      </TipWarp>
    </FollowWarp>
  )
}

export default FollowUs
