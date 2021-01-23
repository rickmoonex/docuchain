import { Server } from "socket.io";
import { Request, Response } from "express";
import actions from "../constants/actions";

export function addDocument(req: Request, res: Response, io: Server): void {
    const { system, data } = req.body;
    io.emit(actions.ADD_DOCUMENT, system, data);
    res.json({ message: "Document added successfully" }).end();
}
