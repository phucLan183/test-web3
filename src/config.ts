import { config } from "dotenv";
config()

if (!process.env.PORT) throw new Error("PORT must be provided")
export const PORT = process.env.PORT

if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be provided")
export const MONGO_URI = process.env.MONGO_URI

if (!process.env.API_ADDRESS) throw new Error("API_ADDRESS must be provided")
export const API_ADDRESS = process.env.API_ADDRESS

if (!process.env.STARTBLOCK) throw new Error("STARTBLOCK must be provided")
export const STARTBLOCK = process.env.STARTBLOCK