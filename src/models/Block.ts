import crypto from "crypto";
import IBlockDetails from "../typings/IBlockDetails";

import Document from "./Document";

export default class Block {
    private _index: number;
    private _proof: number;
    private _previousBlockHash: string;
    private _documents: Array<Document>;
    private _timestamp: number;

    get index(): number {
        return this._index;
    }

    get proof(): number {
        return this._proof;
    }

    set proof(proof: number) {
        this._proof = proof;
    }

    get previousBlockHash(): string {
        return this._previousBlockHash;
    }

    get documents(): Array<Document> {
        return this._documents;
    }

    get timestamp(): number {
        return this._timestamp;
    }

    get details(): IBlockDetails {
        const { _index, _proof, _previousBlockHash, _documents, _timestamp } = this;
        return {
            index: _index,
            proof: _proof,
            timestamp: _timestamp,
            previousBlockHash: _previousBlockHash,
            documents: _documents.map((document) => {
                return document.details;
            }),
        };
    }

    constructor(index: number, previousBlockHash: string, previousProof: number, documents: Array<Document>) {
        this._index = index;
        this._proof = previousProof;
        this._previousBlockHash = previousBlockHash;
        this._documents = documents;
        this._timestamp = Date.now();
    }

    hashValue(): string {
        const { _index, _proof, _documents, _timestamp } = this;
        const blockString = `${_index}-${_proof}-${JSON.stringify(_documents)}-${_timestamp}`;
        const hashFunction = crypto.createHash("sha256");
        hashFunction.update(blockString);
        return hashFunction.digest("hex");
    }

    parseBlock(block: Block): void {
        this._index = block.index;
        this._proof = block.proof;
        this._previousBlockHash = block.previousBlockHash;
        this._timestamp = block.timestamp;
        this._documents = block.documents.map((document) => {
            const parsedDocument = new Document();
            parsedDocument.parseDocument(document);
            return parsedDocument;
        });
    }

    printDocuments(): void {
        this._documents.forEach((document) => console.log(document));
    }
}
