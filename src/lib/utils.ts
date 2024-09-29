import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=af96dbd7-552e-4f4b-8b34-e607f792a78c", "confirmed");
