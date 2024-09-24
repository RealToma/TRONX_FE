import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

interface ConnectWalletButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  text = "CONNECT WALLET",
  onClick,
  className = "",
}) => {
  const { publicKey, disconnect } = useWallet();
  return (
    <div
      className={`cursor-pointer text-center relative text-white text-sm bg-button-gradient connect-wallet ${className} p-[2px] rounded-[12px]`}
    >
      {!!publicKey ? (
        <Popover>
          <PopoverButton className="block bg-[#6a7aff] px-3 sm:px-3 md:px-[12px] rounded-[12px] lg:px-20 py-[10px] hover:bg-white/20 transition-all duration-300 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
            {text}
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y divide-white/5 mt-2 rounded-xl z-10 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="p-2">
              <button
                onClick={disconnect}
                className="block w-full px-3 sm:px-3 md:px-[12px] lg:px-20 text-white rounded-lg py-2 transition bg-[#ff6b6b] hover:bg-[#ff4c4c] shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Disconnect
              </button>
            </div>
          </PopoverPanel>
        </Popover>
      ) : (
        <button
          onClick={onClick}
          className="bg-[#6a7aff] px-3 sm:px-3 md:px-[12px] rounded-[12px] lg:px-20 py-[10px] hover:bg-white/20 transition-all duration-300"
        >
          {text || "CONNECT WALLET"}
        </button>
      )}
    </div>
  );
};
