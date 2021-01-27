/* eslint-disable @typescript-eslint/no-explicit-any */
import lowdb from "lowdb";
import { default as FileAsync } from "lowdb/adapters/FileAsync";
import Block from "../models/Block";

export default class Database {
    private _db: lowdb.LowdbAsync<any>;
    private _dbLocation: string;

    get db(): lowdb.LowdbAsync<any> {
        return this._db;
    }

    constructor(dbLocation: string) {
        this._dbLocation = dbLocation;
        this.initDatabase();
    }

    private async initDatabase(): Promise<void> {
        const adapter = new FileAsync(this._dbLocation);
        this._db = await lowdb(adapter);

        if (!this._db.has("chain").value()) {
            this._db
                .defaults({
                    chain: [],
                })
                .write();
        }
    }

    isEmpty(): boolean {
        if (!this._db.has("chain")) {
            return false;
        }
        return true;
    }

    setBlocks(blocks: Array<Block>): void {
        this._db.set("chain", blocks).write();
    }

    getBlocks(): Array<Block> {
        return this._db.get("chain").value();
    }
}
