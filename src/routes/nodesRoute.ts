import { Router } from "express";
import { Server } from "socket.io";
import { addNode } from "../controllers/nodesController";
import Blockchain from "../models/Blockchain";

export default function nodesRoute(blockchain: Blockchain, io: Server): Router {
    const router = Router();

    router.post("/", (req, res) => {
        addNode(req, res, blockchain, io);
    });

    return router;
}
