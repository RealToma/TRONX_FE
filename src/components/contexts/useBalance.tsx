
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


    // const { connection } = useConnection();

    const getBalance = async () => {
        
    }

    const getRank = useCallback(async () => {
       
    }, [])

    return (
        <BalanceContext.Provider value={{ balance, getBalance, rank, getRank, depositAmount }}>
            {children}
        </BalanceContext.Provider>
    )
}