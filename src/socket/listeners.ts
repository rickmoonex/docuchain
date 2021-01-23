import actions from "../constants/actions";

import Document from "../models/Document";
import Blockchain from "../models/Blockchain";

import { Server } from "socket.io";
import Block from "../models/Block";

export default function socketListeners(socket: Server, chain: Blockchain): Server {
    socket.on(actions.ADD_DOCUMENT, (system: string, data: Record<string, unknown>) => {
        const document = new Document(system, data);
        chain.newDocument(document);
        console.info(`Added document: ${(JSON.stringify(document.details), null, "\t")}`);
    });

    socket.on(actions.END_PROCESSING, (newChain: Array<Block>) => {
        console.log("End of processing encountered");
        process.env.BREAK = "true";
        const blockChain = new Blockchain();
        blockChain.parseChain(newChain);
        if (blockChain.checkValidity() && blockChain.length >= chain.length) {
            chain.blocks = blockChain.blocks;
        }
    });

    return socket;
}
