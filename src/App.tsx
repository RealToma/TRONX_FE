// Import required components from React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CryptoInnovationPage } from "./views/CryptoInnovationPage";
import { MainPage } from "./views/MainPage";
import Lottie from "lottie-react";
import animationData from "./assets/loading/loading.json";
import { useEffect, useState, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { Manage } from "./views/Manage";

import LoginModal from "./components/LoginModal";
import ProtectedRoute from "./components/ProtectRoutes";
import { BalanceContextProvider } from "./components/contexts/useBalance";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

// Default styles that can be overridden by your app
import("@solana/wallet-adapter-react-ui/styles.css");

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/innovation",
    element: <CryptoInnovationPage />,
  },
  {
    path: "/admin",
    element: <LoginModal />,
  },
  {
    path: "/manage", // New route for the actual manage page
    element: (
      <ProtectedRoute>
        <Manage />
      </ProtectedRoute>
    ),
  },
]);

// Main App component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  const network = WalletAdapterNetwork.Devnet;
  // const network = WalletAdapterNetwork.Mainnet;

  // unuseful
  // const network: any =
  //   "https://mainnet.helius-rpc.com/?api-key=af96dbd7-552e-4f4b-8b34-e607f792a78c";

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolongWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <BalanceContextProvider>
              <div
                className={`${
                  isLoading ? "opacity-100" : "opacity-0"
                } transition-all duration-300 fixed min-h-screen w-full h-full top-0 left-0 bg-blue-400 z-[99999] pointer-events-none`}
              >
                <div className="h-full w-full flex items-center justify-center">
                  <Lottie
                    className="max-w-[800px]"
                    height={500}
                    width={500}
                    animationData={animationData}
                  />
                </div>
              </div>
              <RouterProvider router={router} />
            </BalanceContextProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      <NotificationContainer />
    </div>
  );
}

export default App;
