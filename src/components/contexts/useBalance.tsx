import { tronweb } from "@/utils/tronweb.utils";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { createContext, useCallback, useState } from "react";

export interface BalanceContextProps {
    balance: number;
    getBalance: () => void;
    rank: string;
    getRank: () => void;
    depositAmount: number;
}

export const BalanceContext = createContext<BalanceContextProps>({} as BalanceContextProps)

export const BalanceContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [balance, setBalance] = useState(0);
    const [rank, setRank] = useState('starter');
    const [depositAmount, setDepositAmount] = useState(0);

    const { address } = useWallet();

    const getBalance = useCallback(async () => {
        if(!address) return;
        const bal = await tronweb.trx.getBalance(address);
        setBalance(bal / 1_000_000);
    }, [address])

    const getRank = useCallback(async () => {
       
    }, [])

    return (
        <BalanceContext.Provider value={{ balance, getBalance, rank, getRank, depositAmount }}>
            {children}
        </BalanceContext.Provider>
    )
}