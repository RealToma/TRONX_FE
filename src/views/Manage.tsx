import { useCallback, useState } from "react";
import MainBg from "../assets/solAdz-bg.png";
import { Header } from "@/components/Header";
import { ArrowRight, Coins } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import IDL from "../idl/soladz.json";
import {
  TransactionMessage,
  VersionedTransaction,
  PublicKey,
} from "@solana/web3.js";
import { connection } from "@/lib/utils";

export const Manage = () => {
  const [ownershipAddress, setOwnershipAddress] = useState("");

  // const { connection } = useConnection();
  const { publicKey, signAllTransactions, signTransaction } = useWallet();

  const handleTransferOwnership = useCallback(async () => {
    // Implement transfer ownership logic here
    try {
      if (!publicKey || !signTransaction || !signAllTransactions) return;
      const provider = new AnchorProvider(connection, {
        publicKey,
        signTransaction,
        signAllTransactions,
      });
      const program = new Program(IDL as Idl, provider);
      const ixn = await program.methods
        .transferOwnership()
        .accounts({
          newOwner: new PublicKey(ownershipAddress),
        })
        .instruction();
      const instructions = [ixn];
      const { blockhash } = await connection.getLatestBlockhash();
      const message = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();
      const transaction = new VersionedTransaction(message);
      const txn = await signTransaction(transaction);
      await connection.sendTransaction(txn);
      console.log("Transferring ownership to:", ownershipAddress);
    } catch (e) {
      console.log(e);
    }
  }, [ownershipAddress, publicKey, signAllTransactions, signAllTransactions]);

  const handleRecoverStuckSol = useCallback(async () => {
    // Implement recover stuck SOL logic here
    if (!publicKey || !signTransaction || !signAllTransactions) return;
    const provider = new AnchorProvider(connection, {
      publicKey,
      signTransaction,
      signAllTransactions,
    });
    const program = new Program(IDL as Idl, provider);
    const ixn = await program.methods.ownerWithdraw().instruction();
    const instructions = [ixn];
    const { blockhash } = await connection.getLatestBlockhash();
    const message = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message();
    const transaction = new VersionedTransaction(message);
    const txn = await signTransaction(transaction);
    await connection.sendTransaction(txn);
    console.log("Recovering stuck SOL");
  }, [publicKey, signAllTransactions, signAllTransactions]);

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
                Recover Stuck SOL <Coins className="ml-2" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
