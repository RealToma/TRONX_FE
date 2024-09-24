import { CreateUserPayload } from "@/types";
import axios from "axios";

const baseUrl = 'http://localhost:4000';
// const baseUrl = 'http://5.183.8.54:4000';
// const baseUrl = 'https://soladz-backend.vercel.app';

export const userService = {
    create: async (payload: CreateUserPayload) => {
        const res = await axios.post(`${baseUrl}/users`, payload);
        return res.data;
    },
    getCommission: async (address: string) => {
        const res = await axios.get(`${baseUrl}/users/commission/${address}`);
        return res.data;
    },
    getCommissionTxn: async (address: string) => {
        const res = await axios.get(`${baseUrl}/users/commission/txn/${address}`);
        return res.data;
    },
    getUserInfo: async (address: string) => {
        const res = await axios.get(`${baseUrl}/users/${address}`);
        return res.data;
    },
    getMatchingBonsu: async (address: string) => {
        const res = await axios.get(`${baseUrl}/users/matching-bonus/${address}`);
        return res.data;
    }
}