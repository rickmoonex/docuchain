import { Request, Response } from "express";
import axios from "axios";
import client from "socket.io-client";

import Blockchain from "../models/Blockchain";

import socketListeners from "../socket/listeners";

export function addNode(req: Request, res: Response, blockchain: Blockchain): void {
    const white_list = ["http", "https"]
    const host = (new String(req.body.host))
    const port = (new String(req.body.port))
    const node = `http://${host}:${port}`;

    if (!white_list.includes(node)) return
    const socketNode = socketListeners(client(node), blockchain);
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
