// import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCallback, useContext, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
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

  // const { connection } = useConnection();

  const getReward = useCallback(async () => {
    
  }, [])

  useEffect(() => {
    const timer = setInterval(async () => {
      getReward();
    }, 36000)
    return () => {
      clearInterval(timer);
    }
  }, []);

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
    
  }, []);

  return (
    <div className="px-4 mt-12">
      <div className="flex flex-col gap-4 lg:flex-row p-4 md:p-6 max-w-[1200px] border border-dashed rounded-lg border-[#C23631] mx-auto">
        <Card className="w-full py-4 md:py-8 px-2 md:px-4 lg:px-6 bg-gradient-to-b from-red-800 to-black  text-white border-none">
          <CardHeader>
            <h2 className="text-[18px] sm:text-2xl poller font-bold">Smart Contract Info</h2>
          </CardHeader>
          <CardContent>
            <div
              className={`cursor-pointer border-white/20 border-t border-b py-4 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                CA
              </div>
              <div className="text-sm ">{}</div>
            </div>
            <div
              className={`cursor-pointer border-white/20 border-b py-4 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                Total users
              </div>
              <div className="text-sm ">{}</div>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                Total deposited
              </div>
              <div className="text-sm ">{}</div>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                Top sponsor pool
              </div>
              <div className="text-sm ">{}</div>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="text-sm">
                Whale pool
              </div>
              <div className="text-sm ">{}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full py-4 md:py-8 px-2 md:px-4 lg:px-6 bg-gradient-to-b from-red-800 to-black  text-white border-none">
          <CardHeader>
            <h2 className="text-[18px] sm:text-2xl poller font-bold">Personal Statistics</h2>
          </CardHeader>
          <CardContent>
            <div
              className={`cursor-pointer border-t border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-md">Next income</p>
                <p className="text-sm">countdown</p>
              </div>
              <p className="text-sm">{(!!timeLeft) ? `${timeLeft?.hours}:${timeLeft?.mins}:${timeLeft?.sec}` : '--:--:--'}</p>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-md">300% income limit</p>
                <p className="text-sm">remains</p>
              </div>
              <p className="text-sm">{ }</p>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Daily income 1%</p>
              </div>
              <p className="text-sm">{}</p>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Direct referral income</p>
              </div>
              <p className="text-sm">{}</p>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Matching bonus</p>
              </div>
              <p className="text-sm">{}</p>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Top sponsor pool reward</p>
              </div>
              <p className="text-sm">{}</p>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Whale pool reward</p>
              </div>
              <p className="text-sm">{}</p>
            </div>
            <div
              className={`cursor-pointer border-b py-4 border-white/20 flex justify-between items-center hover:bg-white/10 px-4`}
            >
              <div className="">
                <p className="text-sm">Income withdrawn to wallet</p>
              </div>
              <p className="text-sm">{}</p>
            </div>
            <div
              className={`mt-8  relative inline-block p-[2px] w-full rounded-[6px] bg-button-gradient-custom2`}
            >
              <button onClick={withdraw} className="w-full hover:bg-white/20 transition-all duration-300 bg-[#fff] text-black py-1 px-4 rounded flex-1 font-medium text-[14px]">
                Withdraw
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
