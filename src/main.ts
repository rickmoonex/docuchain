import express from "express";
import bodyParser from "body-parser";
import { Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";
import client from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

import Blockchain from "./models/Blockchain";

import socketListeners from "./socket/listeners";
import nodesRoute from "./routes/nodesRoute";
import documentRoute from "./routes/documentRoute";
import chainRoute from "./routes/chainRoute";

const { PORT } = process.env;

const app = express();

const httpServer = new HttpServer(app);

const io = new IoServer(httpServer);

const blockchain = new Blockchain(null, io);

app.use(bodyParser.json());

app.use("/nodes", nodesRoute(blockchain));

app.use("/document", documentRoute(io));

app.use("/chain", chainRoute(blockchain));

io.on("connection", (socket) => {
    console.info(`Socket connected, ID: ${socket.id}`);
    socket.on("disconnect", () => {
        console.info(`Socket disconnected, ID: ${socket.id}`);
    });
});

blockchain.addNode(socketListeners(client(`http://localhost:${PORT}`), blockchain));

httpServer.listen(PORT, () => console.info(`Express server running on port ${PORT}`));
