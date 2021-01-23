import IDocumentDetails from "./IDocumentDetails";

export default interface IBlockDetails {
    index: number;
    proof: number;
    timestamp: number;
    previousBlockHash: string;
    documents: Array<IDocumentDetails>;
}
