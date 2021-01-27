import Database from "./data/Database";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";
import Blockchain from "./models/Blockchain";
import bodyParser from "body-parser";
import nodesRoute from "./routes/nodesRoute";
import documentRoute from "./routes/documentRoute";
import chainRoute from "./routes/chainRoute";
import socketListeners from "./socket/listeners";
import client from "socket.io-client";

export default class Server {
    private _config: Record<string, unknown>;
    private _db: Database;
    private _app: express.Application;
    private _httpServer: HttpServer;
    private _io: IoServer;
    private _blockchain: Blockchain;

    constructor(config: Record<string, unknown>, db: Database) {
        this._config = config;
        this._db = db;
        this._app = express();
        this._httpServer = new HttpServer(this._app);
        this._io = new IoServer(this._httpServer);
        this._blockchain = new Blockchain(null, this._io);
    }

    run(): void {
        process.env.NODE_ENV = "development";

        this._app.use(bodyParser.json());

        this._app.use("/nodes", nodesRoute(this._blockchain));
        this._app.use("/document", documentRoute(this._io));
        this._app.use("/chain", chainRoute(this._blockchain));

        this._io.on("connection", (socket) => {
            console.info(`WebSocket connection established, ID: ${socket.id}`);
            socket.on("diconnect", () => {
                console.info(`WebSocket disconnected, ID: ${socket.id}`);
            });
        });

        this._blockchain.addNode(socketListeners(client(`http://localhost:${this._config.port}`), this._blockchain));

        this._httpServer.listen(this._config.port, () => {
            console.info(`Express server running on port ${this._config.port}`);
        });
    }
}
