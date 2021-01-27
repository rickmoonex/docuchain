import { Router } from "express";
import { addNode } from "../controllers/nodesController";
import Database from "../data/Database";
import Blockchain from "../models/Blockchain";

export default function nodesRoute(blockchain: Blockchain, db: Database): Router {
    const router = Router();

    router.post("/", (req, res) => {
        addNode(req, res, blockchain, db);
    });

    return router;
}
