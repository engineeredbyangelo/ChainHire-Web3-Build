import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { embeddedWallet } from '@civic/auth-web3/wagmi';

export const wagmiConfig = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  connectors: [
    embeddedWallet(),
  ],
});
