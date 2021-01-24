import { Router } from "express";
import { Server } from "socket.io";
import { addDocument } from "../controllers/documentController";

export default function documentRoute(io: Server): Router {
    const router = Router();

    router.post("/", (req, res) => {
        addDocument(req, res, io);
    });

    return router;
}
