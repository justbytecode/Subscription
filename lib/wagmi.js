import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { walletConnect, injected, coinbaseWallet, metaMask } from "@wagmi/connectors";

export const config = getDefaultConfig({
  appName: "RecurX",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http(process.env.AMOY_RPC_URL),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID",
      showQrModal: false, // Use RainbowKit's QR modal instead
    }),
    coinbaseWallet(),
    metaMask(),
  ],
  ssr: true,
});