import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
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
  const { address } = useWallet();
  return (
    <div
      className={`cursor-pointer text-center relative text-black text-sm bg-button-gradient-custom1  connect-wallet ${className} p-[2px] rounded-[12px]`}
    >
      {!!address ? (
        <Popover>
          <PopoverButton className="block text-white  px-3 sm:px-3 md:px-[12px] rounded-[12px] lg:px-20 py-[10px] hover:bg-white/20 transition-all duration-300 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
            {address.toString()}
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y divide-white/5 mt-2 rounded-xl z-10 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="p-2">
              <button
                className="block w-full px-3 sm:px-3 md:px-[12px] lg:px-20 text-white rounded-lg py-2 transition bg-[#C23631] hover:bg-[#923631] shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Disconnect
              </button>
            </div>
          </PopoverPanel>
        </Popover>
      ) : (
        <button
          onClick={onClick}
          className="bg-[rgba(255,255,255)] text-black hover:text-white px-3 sm:px-3 md:px-[12px] rounded-[12px] lg:px-20 py-[10px] hover:bg-white/20 transition-all duration-300"
        >
          {text || "CONNECT WALLET"}
        </button>
      )}
    </div>
  );
};
