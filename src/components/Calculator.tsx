import { useContext, useState } from "react";
import SignatureRequestModal from "./SignatureRequestModal";
import CalculatorBg from "../assets/calculator-bg.png";
import { BalanceContext } from "./contexts/useBalance";

export const Calculator = () => {
  const [solAmount, setSolAmount] = useState(0);

  const { balance } = useContext(BalanceContext);

  const handleAmountClick = (amount: number) => {
    setSolAmount((prevVal) => +(amount + prevVal).toFixed(2));
  };

  const handleReset = () => {
    setSolAmount(0);
  };

  const availableValues = [
    1,100, 200, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000,
  ];

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
                background: "linear-gradient(to right, #fff, #000)", //
              }}
            >
              <div className="bg-[#fff] text-right p-4 rounded-lg">
                <span
                  className={`${
                    balance < solAmount ? "text-[#C23631]" : "text-black"
                  }  text-2xl`}
                >
                  {solAmount} TRX
                </span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 md:gap-5 mb-4">
              {availableValues.map((amount, i) => (
                <div
                  key={i}
                  className={`relative bg-button-gradient-custom2 inline-block rounded-[6px] p-[2px]`}
                >
                  <button
                    onClick={() => handleAmountClick(amount)}
                    className={`
          relative bg-[#fff] hover:bg-white/20 transition-all duration-300 px-1 sm:px-2 w-full py-1 text-black font-light text-sm flex items-center justify-center text-nowrap rounded-[6px]`}
                  >
                    +{amount} TRX
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3 md:gap-5  mb-5">
              <div
                className={`relative inline-block p-[2px] w-full rounded-[6px] bg-button-gradient-custom2`}
              >
                <button
                  onClick={handleReset}
                  className="w-full bg-[#fff] hover:bg-white/20 transition-all duration-300 text-black py-2 px-4 rounded flex-1 font-medium text-[15px]"
                >
                  Reset
                </button>
              </div>
              <div
                className={`relative inline-block p-[2px] w-full bg-button-gradient-custom2 rounded-[6px] ${
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

            <div className="relative inline-block p-[2px] w-full rounded-[6px] bg-button-gradient-custom2">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    // `http://localhost:5173/innovation?ref=${publicKey?.toBase58()}`
                    `https://tron-x.world/innovation?ref=${1}`
                  );
                }}
                className="w-full bg-[#fff] hover:bg-white/20 transition-all duration-300 text-black py-2 px-4 rounded flex-1 font-medium text-[15px]"
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
