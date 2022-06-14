import { ChainId } from 'mojitoswap-sdk'
import MULTICALL_ABI from './abi.json'

// eslint-disable-next-line no-unused-vars
const MULTICALL_ADDRESS = {
  [ChainId.MAINNET]: '0xa64D6AFb48225BDA3259246cfb418c0b91de6D7a',
  [ChainId.TESTNET]: '0x6367360366E4c898488091ac315834B779d8f561',
  1337: '0xfffffffffffffffffffffffffffffffffffff999',
}

export { MULTICALL_ABI, MULTICALL_ADDRESS }
