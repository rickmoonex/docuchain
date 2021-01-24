import Block from "./Block";
import Document from "./Document";

import actions from "../constants/actions";

import { generateProof, isProofValid } from "../utils/proof";

import { Server } from "socket.io";
import IBlockDetails from "../typings/IBlockDetails";

export default class Blockchain {
    private _blocks: Array<Block>;
    private _currentDocuments: Array<Document>;
    private _nodes: Array<SocketIOClient.Socket>;
    private _io: Server;

    get lastBlock(): Block {
        return this._blocks[this._blocks.length - 1];
    }

    get length(): number {
        return this._blocks.length;
    }

    get blocks(): Array<Block> {
        return this._blocks;
    }

    set blocks(blocks: Array<Block>) {
        this._blocks = blocks;
    }

    constructor(blocks?: Array<Block>, io?: Server) {
        this._blocks = blocks || [new Block(0, "1", 0, [])];
        this._currentDocuments = [];
        this._nodes = [];
        this._io = io;
    }

    addNode(node: SocketIOClient.Socket): void {
        this._nodes.push(node);
    }

    processBlock(block: Block): void {
        this._blocks.push(block);
        console.log("Processed successfully");
        this._io.emit(actions.END_PROCESSING, this.toArray());
    }

    async newDocument(document: Document): Promise<void> {
        this._currentDocuments.push(document);
        if (this._currentDocuments.length === 2) {
            console.log("Starting processing documents...");
            const previousBlock = this.lastBlock;
            process.env.BREAK = "false";
            const block = new Block(
                previousBlock.index + 1,
                previousBlock.hashValue(),
                previousBlock.proof,
                this._currentDocuments,
            );
            const { proof, dontProcess } = await generateProof(previousBlock.proof);
            block.proof = proof;
            this._currentDocuments = [];
            if (dontProcess !== "true") {
                this.processBlock(block);
            }
        }
    }

    checkValidity(): boolean {
        const { _blocks } = this;
        let previousBlock = _blocks[0];
        for (let index = 1; index < _blocks.length; index++) {
            const currentBlock = _blocks[index];
            if (currentBlock.previousBlockHash !== previousBlock.hashValue()) {
                return false;
            }
            if (!isProofValid(previousBlock.proof, currentBlock.proof)) {
                return false;
            }
            previousBlock = currentBlock;
        }
        return true;
    }

    parseChain(blocks: Array<Block>): void {
        this._blocks = blocks.map((block) => {
            const parsedBlock = new Block(0);
            parsedBlock.parseBlock(block);
            return parsedBlock;
        });
    }

    toArray(): Array<IBlockDetails> {
        return this._blocks.map((block) => block.details);
    }

    printBlocks(): void {
        this._blocks.forEach((block) => console.log(block));
    }
}
