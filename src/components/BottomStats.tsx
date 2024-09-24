// import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnchorProvider, Idl, Program, utils } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useContext, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import IDL from '../idl/soladz.json';
import { PublicKey, LAMPORTS_PER_SOL, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { BalanceContext } from "./contexts/useBalance";
import { userService } from "@/services/api.service";
import { calculateTimeLeft } from "@/utils/time.utils";
import { User } from "@/types";
import { connection } from "@/lib/utils";

export const BottomStats = () => {
  const [reward, setReward] = useState(0);
  const { getRank, depositAmount } = useContext(BalanceContext);
  const [volume, setVolume] = useState(0);
  const [investorCount, setInvestorCount] = useState(0);
  const [topSponsorPool, setTopSponsorPool] = useState(0);
  const [whalePool, setWhalePool] = useState(0);
  const [commission, setCommission] = useState(0);
  const [lastClaim, setLastClaim] = useState<number | undefined>();
  const [matchingBonus, setMatchingbonus] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ days: string; hours: string; mins: string; sec: string; }>();
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [user, setUser] = useState<User>();

  const { publicKey, signAllTransactions, signTransaction } = useWallet();
  // const { connection } = useConnection();

  const getReward = useCallback(async () => {
    try {
      if (!publicKey || !signTransaction || !signAllTransactions) return;
      const provider = new AnchorProvider(connection, { publicKey, signTransaction, signAllTransactions });
      const program = new Program(IDL as Idl, provider);
      const vault = PublicKey.findProgramAddressSync(
        [
          utils.bytes.utf8.encode("vault")
        ],
        program.programId
      )[0];
      const vol = await connection.getBalance(vault);
      setVolume(Number(vol) / LAMPORTS_PER_SOL);
      const appStats = PublicKey.findProgramAddressSync(
        [
          utils.bytes.utf8.encode("app-stats")
        ],
        program.programId
      )[0];
      // @ts-ignore
      const appStatsAccount = await program.account.appStats.fetch(appStats);
      setInvestorCount(Number(appStatsAccount.investorCount));
      setTopSponsorPool(Number(appStatsAccount.topSponserPool) / LAMPORTS_PER_SOL);
      setWhalePool(Number(appStatsAccount.whalePool) / LAMPORTS_PER_SOL);
      const investorAccount = PublicKey.findProgramAddressSync(
        [
          utils.bytes.utf8.encode("investor"),
          publicKey.toBuffer()
        ],
        program.programId
      )[0];
      // @ts-ignore
      const investor = await program.account.investor.fetch(investorAccount);
      setWithdrawAmount(Number(investor.totalEarned) / LAMPORTS_PER_SOL);
      setLastClaim(Number(investor.lastUpdate));
      const res = await program.methods.rewardView().accounts({
        investorAccount
      }).view();
      setReward(Number(res) / LAMPORTS_PER_SOL);
      const bonus = await userService.getMatchingBonsu(publicKey.toBase58());
      setMatchingbonus(bonus)
      getRank();
      const commssionReward = await userService.getCommission(publicKey.toBase58());
      const userinfo: User = await userService.getUserInfo(publicKey.toBase58());
      setUser(userinfo);
      setCommission(commssionReward);
    } catch (e) {
      console.log(e)
    }
  }, [publicKey, signTransaction, signAllTransactions])

  useEffect(() => {
    const timer = setInterval(async () => {
      getReward();
    }, 36000)
    return () => {
      clearInterval(timer);
    }
  }, [publicKey, signTransaction, signAllTransactions]);

  useEffect(() => {
    if (!lastClaim) return;
    const interval = setInterval(() => {
      let target = lastClaim;
      while (target < Math.floor(Date.now() / 1000)) {
        target += 86400;
      }
      const left = calculateTimeLeft(target);
      setTimeLeft(left)
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [lastClaim])

  const withdraw = useCallback(async () => {
    if (!publicKey || !signTransaction || !signAllTransactions) return;
    const provider = new AnchorProvider(connection, { publicKey, signTransaction, signAllTransactions });
    const program = new Program(IDL as Idl, provider);
    const ixn = await program.methods.claim().instruction();
    const instructions = [ixn];
    const { blockhash } = await connection.getLatestBlockhash();
    const message = new TransactionMessage({
      payerKey: publicKey,
      recentBlockhash: blockhash,
      instructions
    }).compileToV0Message();
    const transaction = new VersionedTransaction(message);
    const txn = await signTransaction(transaction);
    await connection.sendTransaction(txn);
    // withdraw commission
    const serialzedBuff = await userService.getCommissionTxn(publicKey.toBase58());
    const txnBuf = Buffer.from(serialzedBuff, 'base64');
    const sendTxn = VersionedTransaction.deserialize(txnBuf);
    const signed = await signTransaction(sendTxn);
    await connection.sendTransaction(signed);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }, [publicKey, signTransaction, signAllTransactions]);

  return (
    <div className="px-4 mt-12">
      <div className="flex flex-col gap-4 lg:flex-row p-4 md:p-6 max-w-[1200px] border border-dashed rounded-lg border-black mx-auto">
        <Card className="w-full py-4 md:py-8 px-2 md:px-4 lg:px-6 bg-[#0A1129] text-white border-none">
          <CardHeader>
            <h2 className="text-[18px] sm:text-2xl poller font-bold">Smart Contract Info</h2>
          </CardHeader>
          <CardContent>
            <div
              className={`border-white/20 border-t border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                CA
              </div>
              <div className="text-sm ">{window.innerWidth<700?`${IDL.address.slice(0, 8)}...${IDL.address.slice(-8)}`:IDL.address}</div>
            </div>
            <div
              className={`border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                Total users
              </div>
              <div className="text-sm ">{!!publicKey ? `${investorCount}` : '-'}</div>
            </div>
            <div
              className={`border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                Total deposited
              </div>
              <div className="text-sm ">{!!publicKey ? `${volume.toFixed(4)} SOL` : '-'}</div>
            </div>
            <div
              className={`border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                Top sponsor pool
              </div>
              <div className="text-sm ">{!!publicKey ? `${topSponsorPool.toFixed(4)} SOL` : '-'}</div>
            </div>
            <div
              className={`border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                Whale pool
              </div>
              <div className="text-sm ">{!!publicKey ? `${whalePool.toFixed(4)} SOL` : '-'}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full py-4 md:py-8 px-2 md:px-4 lg:px-6 bg-[#0A1129] text-white border-none">
          <CardHeader>
            <h2 className="text-[18px] sm:text-2xl poller font-bold">Personal Statistics</h2>
          </CardHeader>
          <CardContent>
            <div
              className={`"border-white/20 border-t border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-md">Next income</p>
                <p className="text-sm">countdown</p>
              </div>
              <p className="text-sm">{(!!timeLeft && !!publicKey) ? `${timeLeft?.hours}:${timeLeft?.mins}:${timeLeft?.sec}` : '--:--:--'}</p>
            </div>
            <div
              className={`"border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-md">300% income limit</p>
                <p className="text-sm">remains</p>
              </div>
              <p className="text-sm">{ !!publicKey ? `${(depositAmount * 3).toFixed(4) } SOL` : '-'}</p>
            </div>
            <div
              className={`"border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Daily income 1%</p>
              </div>
              <p className="text-sm">{!!publicKey ? `${reward} SOL` : '-'}</p>
            </div>
            <div
              className={`"border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Direct referral income</p>
              </div>
              <p className="text-sm">{!!publicKey ? `${commission} SOL` : '-'}</p>
            </div>
            <div
              className={`"border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Matching bonus</p>
              </div>
              <p className="text-sm">{!!publicKey ? `${matchingBonus} SOL` : '-'}</p>
            </div>
            <div
              className={`"border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Top sponsor pool reward</p>
              </div>
              <p className="text-sm">{!!publicKey ? `${!!user ? user?.topSponsorReward : 0} SOL` : '-'}</p>
            </div>
            <div
              className={`"border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Whale pool reward</p>
              </div>
              <p className="text-sm">{!!publicKey ? `${!!user ? user?.whalePoolReward : 0} SOL` : '-'}</p>
            </div>
            <div
              className={`"border-white/20 border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Income withdrawn to wallet</p>
              </div>
              <p className="text-sm">{!!publicKey ? `${withdrawAmount} SOL` : '-'}</p>
            </div>
            <div
              className={`mt-8  relative inline-block p-[2px] w-full rounded-[6px] bg-button-gradient-2`}
            >
              <button onClick={withdraw} className="w-full hover:bg-white/20 transition-all duration-300 bg-[#140e3c] text-white py-1 px-4 rounded flex-1 font-medium text-[14px]">
                Withdraw
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
