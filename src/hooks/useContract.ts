import { Contract } from '@ethersproject/contracts'
import { WETH } from 'mojitoswap-sdk'
import { useMemo } from 'react'
import { MULTICALL_ABI } from '../constants/multicall'
import { getContract } from 'utils/index'
import ERC20_ABI from 'constants/abi/ERC20.json'
import WETH_ABI from 'constants/abi/weth.json'
import VALIDATOR_ABI from 'constants/abi/Validators.json'
import { getStakerAddress, getMulticallAddress } from '../utils/addressHelpers'
import { JsonRpcProvider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'

// returns null on errors
function useContract(address: string, ABI: any, withSignerIfPossible = true): Contract {
  const { library, account } = useWeb3React()

  const provider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL)

  return useMemo(() => {
    if (!library || !account) {
      return getContract(address, ABI, provider as any, undefined)
    }

    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return getContract(address, ABI, library, undefined)
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const chainId = Number(process.env.REACT_APP_CHAIN_ID) as any
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  return useContract(getMulticallAddress(), MULTICALL_ABI, true)
}

export function useStakerContract(): Contract {
  return useContract(getStakerAddress(), VALIDATOR_ABI, true)
}
