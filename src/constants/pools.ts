import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { PoolConfig } from './types'

dayjs.extend(utc)

// when adding new pool, pls keep sousId the same as sortOrder
const devPools: PoolConfig[] = [
  {
    name: 'POOL1',
    address: '0x20b9a60c5a2137259ce81e45a1310a754270753b',
    website: 'https://test.com',
    email: '',
    details: '',
  },
  {
    name: 'POOL2',
    address: '0xe40c3ef8dc2dd6d3edecd8ebdc64a6b68f530589',
    website: 'https://test.com',
    email: '',
    details: '',
  },
  {
    name: 'POOL3',
    address: '0xbf8144aa88bea302548f51b3d776b8b7e4453449',
    website: 'https://test.com',
    email: '',
    details: '',
  },
  {
    name: 'POOL4',
    address: '0xce7878e800408d60e7b55d7d5c56519f329a77fc',
    website: 'https://test.com',
    email: '',
    details: '',
  },
  {
    name: 'POOL5',
    address: '0xB99175F71F64391c186886258C0A824bc3810887',
    website: 'https://test.com',
    email: '',
    details: '',
  },
  {
    name: 'POOL6',
    address: '0x000000000000000000000000000000000000f999',
    website: 'https://test.com',
    email: '',
    details: '',
  },
  {
    name: 'POOL7',
    address: '0x24b1f6b068f34f619f8d9d5e6ba3fb18f586d50b',
    website: 'https://test.com',
    email: '',
    details: '',
  },
]

const proPools = [
  {
    name: 'POOL4',
    address: '0xce7878e800408d60e7b55d7d5c56519f329a77fc',
    website: 'https://test.com',
    email: '',
    details: '',
  },
]

const pools = process.env.REACT_APP_NETWORK_ENV === 'test' ? devPools : proPools

export default pools
