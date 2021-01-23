import IDocumentDetails from "../typings/IDocumentDetails";

export default class Document {
    system: string;
    data: Record<string, unknown>;

    constructor(system: string, data: Record<string, unknown>) {
        this.system = system;
        this.data = data;
    }

    getDetails(): IDocumentDetails {
        const { system, data } = this;
        return {
            system,
            data,
        };
    }

    parseDocument(document: Document): void {
        this.system = document.system;
        this.data = document.data;
    }
}
