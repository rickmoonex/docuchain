import { Response } from "express";
import Blockchain from "../models/Blockchain";

export function getChain(res: Response, blockchain: Blockchain): void {
    res.json({ chain: blockchain.toArray() }).end();
}
