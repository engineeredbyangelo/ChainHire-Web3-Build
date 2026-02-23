import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { embeddedWallet } from '@civic/auth-web3/wagmi';
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  connectors: [
    embeddedWallet(),
    injected(),                          // MetaMask & other injected wallets
    coinbaseWallet({ appName: 'ChainHire' }),
    walletConnect({ projectId: 'chainhire' }), // placeholder — replace with real WalletConnect project ID if needed
  ],
});
