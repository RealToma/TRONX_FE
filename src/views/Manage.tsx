import { useCallback, useState } from "react";
import MainBg from "../assets/solAdz-bg.png";
import { Header } from "@/components/Header";
import { ArrowRight, Coins } from "lucide-react";

export const Manage = () => {
  const [ownershipAddress, setOwnershipAddress] = useState("");

  // const { connection } = useConnection();


  const handleTransferOwnership = useCallback(async () => {
    // Implement transfer ownership logic here
  }, [ownershipAddress]);

  const handleRecoverStuckSol = useCallback(async () => {
    
  }, []);

  return (
    <div className="min-h-screen pb-12 relative h-full overflow-x-hidden">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={MainBg}
        alt="Bg Hero"
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Header />

          <div className="mt-10 space-y-8 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Manage Contract
            </h2>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Transfer Ownership
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="New Owner Address"
                  value={ownershipAddress}
                  onChange={(e) => setOwnershipAddress(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleTransferOwnership}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out flex items-center"
                >
                  Transfer <ArrowRight className="ml-2" size={18} />
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={handleRecoverStuckSol}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md transition duration-300 ease-in-out flex items-center"
              >
                Recover Stuck TRX <Coins className="ml-2" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
