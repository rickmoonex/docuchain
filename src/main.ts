import Database from "./data/Database";
import Server from "./Server";

import getConfig from "./services/config";

const config = getConfig();

const db = new Database(String(config.dbLocation));

const server = new Server(config, db);

server.run();
