import axios from "axios";
import { Depth, KLine, Ticker, Trade } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://exchange-proxy.100xdevs.com/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: API_KEY ? { "X-MEXC-APIKEY": API_KEY } : {},
});

export async function getTicker(market: string): Promise<Ticker> {
    const tickers = await getTickers();
    const ticker = tickers.find(t => t.symbol === market);
    if (!ticker) {
        throw new Error(`No ticker found for ${market}`);
    }
    return ticker;
}

export async function getTickers(): Promise<Ticker[]> {
    const response = await apiClient.get(`/tickers`);
    return response.data;
}


export async function getDepth(market: string): Promise<Depth> {
    const response = await apiClient.get(`/depth?symbol=${market}`);
    return response.data;
}
export async function getTrades(market: string): Promise<Trade[]> {
    const response = await apiClient.get(`/trades?symbol=${market}`);
    return response.data;
}

export async function getKlines(market: string, interval: string, startTime: number, endTime: number): Promise<KLine[]> {
    const response = await apiClient.get(`/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
    const data: KLine[] = response.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}

export async function getMarkets(): Promise<string[]> {
    const response = await apiClient.get(`/markets`);
    return response.data;
}