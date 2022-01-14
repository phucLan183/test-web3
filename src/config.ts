import { config } from "dotenv";
config()

if (!process.env.PORT) throw new Error("PORT must be provided")
export const PORT = process.env.PORT

if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be provided")
export const MONGO_URI = process.env.MONGO_URI

if (!process.env.API_ADDRESS) throw new Error("API_ADDRESS must be provided")
export const API_ADDRESS = process.env.API_ADDRESS

if (!process.env.STARTBLOCK) throw new Error("STARTBLOCK must be provided")
export const STARTBLOCK = Number(process.env.STARTBLOCK)

if (!process.env.STEPBLOCK) throw new Error("STEPBLOCK must be provided")
export const STEPBLOCK = Number(process.env.STEPBLOCK)

if (!process.env.ADDRESS_CONTRACT_PRL) throw new Error("ADDRESS_CONTRACT_PRL must be provided")
export const ADDRESS_CONTRACT_PRL = process.env.ADDRESS_CONTRACT_PRL