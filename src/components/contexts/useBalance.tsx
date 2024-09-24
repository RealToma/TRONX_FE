import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useCallback, useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Idl, Program, utils } from "@coral-xyz/anchor";
import IDL from '../../idl/soladz.json';
import { calculateRank } from "@/utils/soladz.utils";
import { connection } from "@/lib/utils";

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

    const { publicKey, signAllTransactions, signTransaction } = useWallet();

    // const { connection } = useConnection();

    console.log("publicKey:",publicKey?.toBase58())

    const getBalance = async () => {
        if (!publicKey || !connection) return;
        try {
            const balance = await connection.getBalance(publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        } catch { }
    }

    const getRank = useCallback(async () => {
        try {
            if (!publicKey || !signTransaction || !signAllTransactions) return;
            const provider = new AnchorProvider(connection, { publicKey, signTransaction, signAllTransactions });
            const program = new Program(IDL as Idl, provider);
            const investor = PublicKey.findProgramAddressSync(
                [
                    utils.bytes.utf8.encode("investor"),
                    publicKey.toBuffer()
                ],
                program.programId
            )[0];
            // @ts-ignore
            const investorAccount = await program.account.investor.fetch(investor);
            const solAmount = Number(investorAccount.amount) / LAMPORTS_PER_SOL;
            setDepositAmount(solAmount);
            setRank(calculateRank(solAmount));
        } catch (e) {
            console.log(e);
        }
    }, [publicKey, connection, signAllTransactions, signTransaction])

    return (
        <BalanceContext.Provider value={{ balance, getBalance, rank, getRank, depositAmount }}>
            {children}
        </BalanceContext.Provider>
    )
}