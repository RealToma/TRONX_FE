import { useCallback, useContext, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import { Switch } from "@/components/ui/switch";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogOverlay } from "@radix-ui/react-dialog";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useWallet } from "@solana/wallet-adapter-react";
import IDL from '../idl/soladz.json';
import { AnchorProvider, BN, Idl, Program, utils } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, TransactionMessage, VersionedTransaction, PublicKey } from '@solana/web3.js';
import moment from 'moment';
import { BalanceContext } from "./contexts/useBalance";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "react-router-dom";
import { userService } from "@/services/api.service";
import { connection } from "@/lib/utils";

const TransactionItem = ({ leftVal, rightVal }: { leftVal: string; rightVal: string }) => {
  return (
    <div className="flex justify-between text-sm gap-4 py-2 border-b border-gray-200">
      <span className="">{leftVal}</span>
      <span className="font-semibold break-all text-right">{rightVal}</span>
    </div>
  );
};

const SignatureRequestModal = ({ solAmount, resetAmount }: { solAmount: number, resetAmount: () => void; }) => {
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

  // const { connection } = useConnection();
  const { publicKey, signAllTransactions, signTransaction } = useWallet();
  const [spentAmount, setSpentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { getBalance, getRank, balance } = useContext(BalanceContext);

  const [searchParams] = useSearchParams();

  const handleTransaction = useCallback(async () => {
    try {
      if (!publicKey || !signTransaction || !signAllTransactions) return;
      setIsLoading(true);
      const provider = new AnchorProvider(connection, { publicKey, signTransaction, signAllTransactions });
      const program = new Program(IDL as Idl, provider);
      const ref = searchParams.get('ref');
      const instructions = [];
      const investorAccount = PublicKey.findProgramAddressSync(
        [
          utils.bytes.utf8.encode("investor"),
          publicKey.toBuffer()
        ],
        program.programId
      )[0];
      let isNew = false;
      let referrer: PublicKey | null = null;
      try {
        // @ts-ignore
        await program.account.investor.fetch(investorAccount);
      } catch (e) {
        isNew = true;
      }
      if (!!ref && isNew) {
        referrer = new PublicKey(ref);
        const ixn = await program.methods.initInvestorWithRef(new BN(solAmount * LAMPORTS_PER_SOL)).accounts({
          referrer
        }).instruction();
        instructions.push(ixn);
      } else {
        const ixn = await program.methods.invest(new BN(solAmount * LAMPORTS_PER_SOL)).accounts({
          referrer: publicKey
        }).instruction();
        instructions.push(ixn);
      }
      const { blockhash } = await connection.getLatestBlockhash();
      const message = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions
      }).compileToV0Message();
      const transaction = new VersionedTransaction(message);
      const txn = await signTransaction(transaction);
      const sign = await connection.sendTransaction(txn);
      setTxHash(sign);
      await new Promise((resolve) => setTimeout(resolve, 3000));

        if (!!referrer) {
          await userService.create({
            address: publicKey.toBase58(),
            account: investorAccount.toBase58(),
            referrer: referrer.toBase58(),
            amount: Number(solAmount)
          })
        } else {
          await userService.create({
            address: publicKey.toBase58(),
            account: investorAccount.toBase58(),
            amount: Number(solAmount)
          })
        }
    
      setTransactionSuccess(true);
      setSpentAmount(solAmount);
      resetAmount();
      getBalance();
      getRank();
      setIsLoading(false);
    } catch (e) {
      console.log(e)
      setIsLoading(false);
    }
  }, [publicKey, signAllTransactions, signAllTransactions, solAmount]);

  const DialogContentRender = (
    <div>
      {!transactionSuccess && (
        <>
          <div className="text-center mb-6">
            <p className="text-2xl font-semibold ">Request Signature</p>
            <p className="text-gray-500">sol-adz.com is requesting you to sign.</p>
          </div>
          <div className="text-3xl font-bold text-center text-blue-300 mb-6">
            {solAmount} SOL
          </div>
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center font-medium text-blue-700">
                ME
              </div>
              <div className="text-sm mt-2 text-center">{`${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}`}</div>
              {/* <div className="text-xs text-gray-500">500 TRX</div> */}
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center font-medium text-blue-700">
                SC
              </div>
              <div className="text-sm mt-2 text-center">{`${IDL.address.slice(0, 4)}...${IDL.address.slice(-4)}`}</div>
            </div>
          </div>
          <div className="space-y-4 border-t border-gray-200 pt-4 mb-6">
            <TransactionItem leftVal="Type" rightVal="Smart Contract Trigger" />
            <TransactionItem leftVal="Network" rightVal="Mainnet" />
            <TransactionItem
              leftVal="Contract"
              rightVal={`${IDL.address.slice(0, 12)}...${IDL.address.slice(-12)}`}
            />
            <TransactionItem leftVal="Function" rightVal="invest(uint256)" />
          </div>
          {/* <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Enable automatic signature
                    </span>
                    <Switch />
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    Allow SolLink to automatically sign for this DApp.
                  </p>
                  <Input
                    className="w-full border-gray-300 text-black rounded-md mt-2"
                    placeholder="For 1 hour "
                  />
                </div> */}
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button
                size="lg"
                variant="outline"
                className="w-full text-red-600 border-red-600 hover:border-red-700 hover:text-red-700 transition"
              >
                Reject
              </Button>
            </DialogClose>
            <Button
              onClick={handleTransaction}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition"
              disabled={isLoading}
            >
              Accept
            </Button>
          </div>
        </>
      )}
      {transactionSuccess && (
        <>
          <DialogClose
            onClick={() => setTransactionSuccess(false)}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
          >
            <FaChevronLeft size={20} />
          </DialogClose>
          <button className="absolute bottom-4 right-4 text-gray-500 hover:text-gray-700">
            <FaChevronRight size={20} />
          </button>
          <div className="text-center px-6 w-full">
            <div className="text-2xl font-semibold mb-4 ">Transaction Details</div>
            <div className="text-green-500 text-center flex items-center justify-center text-4xl mb-2">
              <FaCircleCheck />
            </div>
            <div className="text-green-500 font-bold mb-2">Success</div>
            <div className="text-gray-500 mb-4">{`-${spentAmount}SOL`}</div>
            <div className="space-y-4 text-left ">
              <div>
                <span className="font-medium">Transfer account</span>
                <div>{publicKey?.toBase58()}</div>
              </div>
              {/* <div>
                      <span className="font-medium">Receiving account</span>
                      <div>TPteDwgC28Df5XYeXvTrR2xyszbxengjFx</div>
                    </div> */}
              <div>
                <span className="font-medium">Transaction type</span>
                <div>Smart Contract Trigger</div>
              </div>
              <div>
                <span className="font-medium break-words break-all text-wrap">
                  Transaction ID
                </span>
                <div className="break-all">
                  {txHash}
                </div>
              </div>
              <div>
                <span className="font-medium">Transaction time</span>
                <div>{moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}</div>
              </div>
              {/* <div>
                      <span className="font-medium">Block height</span>
                      <div>24475339</div>
                    </div> */}
              <div>
                {/* <span className="font-medium">Fee (?)</span> */}
              </div>
            </div>
            {/* <a href={`https://explorer.solana.com/tx/${txHash}?cluster=mainnet-beta`} target="blank" className="mt-4 text-blue-600 cursor-pointer"> */}
            <a href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`} target="blank" className="mt-4 text-blue-600 cursor-pointer">
              Go to solscan for the detailed transaction.
            </a>
          </div>
        </>
      )}
    </div>
  )

  return (
    <Dialog>
      <DialogTrigger disabled={solAmount === 0 || !publicKey} asChild>
        <button disabled={!publicKey || solAmount === 0} className="w-full bg-[#140e3c] hover:bg-white/20 transition-all duration-300 text-white py-2 px-4 rounded flex-1 font-medium text-[15px] disabled:hover:bg-[#140e3c]">
          Deposit
        </button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/50 grid place-items-center overflow-y-auto">
        <DialogContent className="border-none max-h-[95vh] overflow-y-auto min-w-[300px] max-w-lg p-6 bg-[#0d1432] text-white rounded-lg shadow-xl">
          {
            balance > solAmount ? DialogContentRender : (
              <div className="flex flex-col">
                <div className="text-red-600 flex gap-4 items-center text-2xl font-bold justify-center h-[100px]">
                  <ExclamationTriangleIcon width={30} height={40} />
                  <div>Insufficient Balance</div>
                </div>
                <DialogClose asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-red-600 border-red-600 hover:border-red-700 hover:text-red-700 transition"
                  >
                    Reject
                  </Button>
                </DialogClose>
              </div>
            )
          }
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default SignatureRequestModal;
