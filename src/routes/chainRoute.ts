import { Router } from "express";
import { getChain } from "../controllers/chainController";
import Blockchain from "../models/Blockchain";

export default function chainRoute(blockchain: Blockchain): Router {
    const router = Router();

    router.get("/", (req, res) => {
        getChain(res, blockchain);
    });

    return router;
}
