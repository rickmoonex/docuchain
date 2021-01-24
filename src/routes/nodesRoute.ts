import { Router } from "express";
import { addNode } from "../controllers/nodesController";
import Blockchain from "../models/Blockchain";

export default function nodesRoute(blockchain: Blockchain): Router {
    const router = Router();

    router.post("/", (req, res) => {
        addNode(req, res, blockchain);
    });

    return router;
}
