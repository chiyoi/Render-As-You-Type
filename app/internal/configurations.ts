import { QueryClient } from '@tanstack/react-query'
import { http, createConfig } from 'wagmi'
import { sepolia, mainnet } from 'viem/chains'

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  storage: null,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

export const queryClient = new QueryClient()
