import IDocumentDetails from "../typings/IDocumentDetails";

export default class Document {
    _system: string;
    _data: Record<string, unknown>;

    get system(): string {
        return this._system;
    }

    get data(): Record<string, unknown> {
        return this._data;
    }

    get details(): IDocumentDetails {
        const { _system, _data } = this;
        return {
            system: _system,
            data: _data,
        };
    }

    constructor(system?: string, data?: Record<string, unknown>) {
        this._system = system;
        this._data = data;
    }

    parseDocument(document: Document): void {
        this._system = document.system;
        this._data = document.data;
    }
}
