

export interface CreateUserPayload {
    address: string;
    account: string;
    referrer?: string;
    amount: number;
}

export interface User {
    address: string;
    account: string;
    referrer: string;
    topSponsorReward: number;
    whalePoolReward: number;
}