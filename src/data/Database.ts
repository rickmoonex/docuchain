/* eslint-disable @typescript-eslint/no-explicit-any */
import lowdb from "lowdb";
import { default as FileAsync } from "lowdb/adapters/FileAsync";
import Blockchain from "../models/Blockchain";

export default class Database {
    private db: lowdb.LowdbAsync<any>;
    private dbLocation: string;

    constructor(dbLocation: string) {
        this.dbLocation = dbLocation;
        this.initDatabase();
    }

    private async initDatabase(): Promise<void> {
        const adapter = new FileAsync(this.dbLocation);
        this.db = await lowdb(adapter);

        if (!this.db.has("chain").value()) {
            this.db
                .defaults({
                    chain: [],
                })
                .write();
        }
    }

    async setBlockchain(blockchain: Blockchain): Promise<void> {
        const chainArray = await blockchain.toArray();
        await this.db.set("chain", chainArray).write();
    }
}
