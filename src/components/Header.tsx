import { ConnectWalletButton } from "./common/ConnectWalletButton";
import TopLogoText from "../assets/logoText.png";
import { Link } from "react-router-dom";
import {
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useEffect } from "react";
import { BalanceContext } from "./contexts/useBalance";

export const Header = () => {
  const rightText = "MY INVESET RANK : STARTER" + '\u00a0' + '\u00a0' + '\u00a0' + "|" + '\u00a0' + '\u00a0' + '\u00a0' + "MY SOL :";
  const { setVisible } = useWalletModal();
  const { publicKey } = useWallet();
  const { balance, getBalance, getRank, rank } = useContext(BalanceContext);

  useEffect(() => {
    getBalance();
    getRank();
  }, [publicKey]);

  return (
    <div>
      <header className="flex gap-1 justify-between items-center mt-12">
        <Link to={"/"} className="flex items-center gap-2 sm:gap-4">
          <img
            className="w-[120px] md:w-[150px] lg:w-[200px]"
            src={TopLogoText}
            alt="top logo"
          />
          {/* <h2 className="bg-gradient-to-br from-[#F7F6FF] via-[#F7F6FF_26%] to-[#C669FF] bg-clip-text text-[30px] lg:text-[50px] text-transparent poller">
            Tron X
          </h2> */}
        </Link>

        <div className="flex items-center text-xs lg:text-sm">
          <div className="hidden md:flex">
            {
              !!publicKey && (
                <span className="text-black mr-4 uppercase">
                  {`MY Tron X RANK: ${rank} | BALANCE: ${!!balance ? balance.toFixed(3) : 0} SOL`}
                </span>
              )
            }
          </div>
          <ConnectWalletButton
            onClick={() => setVisible(true)}
            text={
              !!publicKey
                ? `${publicKey.toBase58().slice(0, 4)}...${publicKey
                  .toBase58()
                  .slice(-4)}`
                : "connect wallet"
            }
          />
        </div>
      </header>

      <div className=" flex text-center md:hidden justify-center mt-6">
        <span className="text-black text-xs mr-4">{rightText}</span>
      </div>
    </div>
  );
};
