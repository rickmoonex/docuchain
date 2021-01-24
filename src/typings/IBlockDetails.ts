import IDocumentDetails from "./IDocumentDetails";

export default interface IBlockDetails {
    index: number;
    proof: number;
    timestamp: number;
    blockHash: string;
    previousBlockHash: string;
    documents: Array<IDocumentDetails>;
}
