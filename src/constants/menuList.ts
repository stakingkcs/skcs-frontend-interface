import { KCC, sKCS } from './index'

export interface NavItemType {
  name: any
  hasChildren?: boolean
  hasGroup?: boolean
  route?: string
  suffix?: boolean
  childrens?: NavItemChildrenType[] | NavItemGroupType[]
}

export interface NavItemChildrenType {
  title: string
  subTitle: string
  route: string
  icon: string
  setOpenKeys?: any
}

export interface NavItemGroupType {
  groupName: string
  groupMember: NavItemChildrenType[]
}

export const HOME_MENU_LIST = [
  {
    title: 'Developer Docs',
    subTitle: 'Start building on KuCoin Community Chain',
    route: KCC.DOCS_URL,
    icon: require('../assets/images/Icons/menu/docs@2x.png').default,
  },
  {
    title: 'Github',
    subTitle: 'Visit our Github community',
    route: KCC.GITHUB_URL,
    icon: require('../assets/images/Icons/menu/github@2x.png').default,
  },
]

export const MENU_LIST = [
  {
    name: 'Home',
    route: '/home',
    hasChildren: false,
  },
  {
    name: 'Staking',
    route: '/staking',
    hasChildren: false,
  },
  {
    name: 'DeFi Market',
    route: '/defi-market',
    hasChildren: false,
  },
  {
    name: 'sKCS Win',
    route: '/skcs-win',
    hasChildren: false,
    suffix: true,
  },
  {
    name: 'Doc',
    route: sKCS.docs,
    hasChildren: false,
  },
  {
    name: 'FAQ',
    route: sKCS.faq,
    hasChildren: false,
  },
]
