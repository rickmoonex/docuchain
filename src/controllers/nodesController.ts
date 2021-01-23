import { Request, Response } from "express";
import { Server } from "socket.io";
import axios from "axios";

import Blockchain from "../models/Blockchain";

import socketListeners from "../socket/listeners";

export function addNode(req: Request, res: Response, blockchain: Blockchain, io: Server): void {
    const { host, port } = req.body;
    const { callback } = req.query;
    const node = `http://${host}:${port}`;
    const socketNode = socketListeners(io, blockchain);
    blockchain.addNode(socketNode);
    if (callback === "true") {
        console.info(`Added node ${node} back`);
        res.json({ status: "Added node back" }).end();
    } else {
        axios.post(`${node}/nodes?callback=true`, {
            host: req.hostname,
            port: process.env.PORT,
        });
        console.info(`Added node ${node}`);
        res.json({ status: "Added node" }).end();
    }
}
