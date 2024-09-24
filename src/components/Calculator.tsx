import { useContext, useState } from "react";
import SignatureRequestModal from "./SignatureRequestModal";
import CalculatorBg from "../assets/calculator-bg.png";
import { BalanceContext } from "./contexts/useBalance";
import { useWallet } from "@solana/wallet-adapter-react";

export const Calculator = () => {
  const [solAmount, setSolAmount] = useState(0);

  const { balance } = useContext(BalanceContext);
  const { publicKey } = useWallet();

  const handleAmountClick = (amount: number) => {
    setSolAmount((prevVal) => +(amount + prevVal).toFixed(2));
  };

  const handleReset = () => {
    setSolAmount(0);
  };

  const availableValues = [0.1, 0.3, 0.5, 1, 1.5, 3, 5, 10, 25, 55, 50, 100];

  return (
    <div className="flex items-center justify-center lg:block ">
      <div className="relative mx-auto lg:mx-[unset] lg:max-w-[96.5vw] bg-black lg:bg-transparent rounded-xl lg:rounded-none z-0 mt-8 lg:-mt-44">
        <img
          className="hidden lg:block absolute top-0 left-0 w-full h-full"
          src={CalculatorBg}
          alt="calculator-bg"
        />
        <div className="p-4 sm:p-8">
          <div className="relative z-10 lg:ml-auto max-w-[547px] rounded-r-lg">
            <div
              className={`relative rounded-[6px] inline-block p-[2px] w-full  mb-5`}
              style={{
                background: "linear-gradient(to right, #623EFF, #7AD6FF)", //
              }}
            >
              <div className="bg-[#171c2c] text-right p-4 rounded-lg">
                <span
                  className={`${
                    balance < solAmount ? "text-red-600" : "text-white"
                  }  text-2xl`}
                >
                  {solAmount} SOL
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 md:gap-5 mb-4">
              {availableValues.map((amount, i) => (
                <div
                  key={i}
                  className={`relative bg-button-gradient-2 inline-block rounded-[6px] p-[2px]`}
                >
                  <button
                    onClick={() => handleAmountClick(amount)}
                    className={`
          relative bg-[#191e34] hover:bg-white/20 transition-all duration-300 px-1 sm:px-2 w-full py-1 text-white font-light text-sm flex items-center justify-center text-nowrap rounded-[6px]`}
                  >
                    +{amount} SOL
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3 md:gap-5  mb-5">
              <div
                className={`relative inline-block p-[2px] w-full rounded-[6px] bg-button-gradient-2`}
              >
                <button
                  onClick={handleReset}
                  className="w-full bg-[#140e3c] hover:bg-white/20 transition-all duration-300 text-white py-2 px-4 rounded flex-1 font-medium text-[15px]"
                >
                  Reset
                </button>
              </div>
              <div
                className={`relative inline-block p-[2px] w-full bg-button-gradient-2 rounded-[6px] ${
                  solAmount === 0 ? "opacity-30" : ""
                }`}
              >
                {/* Here is the signature request modal */}
                <SignatureRequestModal
                  solAmount={solAmount}
                  resetAmount={() => setSolAmount(0)}
                />
              </div>
            </div>

            <div className="relative inline-block p-[2px] w-full rounded-[6px] bg-button-gradient-2">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    // `http://localhost:5173/innovation?ref=${publicKey?.toBase58()}`
                    `https://sol-adz.com/innovation?ref=${publicKey?.toBase58()}`
                  );
                }}
                className="w-full bg-[#140e3c] hover:bg-white/20 transition-all duration-300 text-white py-2 px-4 rounded flex-1 font-medium text-[15px]"
              >
                Copy Referral Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
