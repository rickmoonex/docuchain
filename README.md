# About

Docuchain is a simple blockchain client that allows the user to store documents in a blockchain data structure.

# Endpoints

## `/nodes`

The `/nodes` endpoint is used to register new nodes to the network.

### `POST`

#### Request

-   `hostname` - The hostname of the to be added node.

-   `port` - The port of the to be added node.

Example:

```json
{
    "hostname": "10.0.10.234",
    "port": 5832
}
```

#### Response

-   `status` - The status of the operation.

Example:

```json
{
    "status": "Added node"
}
```

## `/document`

The `/document` endpoint is used to add new documents to be processed into the blockchain.

### `POST`

#### Request

-   `system` - The overarching system that the document is part of.

-   `data` - The data that the document contains. This can hold any valid JSON object.

Example:

```json
{
    "system": "HR Dossiers",
    "data": {
        "title": "Dossier 1",
        "createdDate": "25-1-2020",
        "createdBy": "John Smith"
    }
}
```

#### Response

-   `status` - The status of the operation.

Example:

```json
{
    "status": "Document added successfully"
}
```

## `/chain`

The `/chain` endpoint is used to retrieve the entire blockchain as a JSON object.

### `GET`

#### Response

-   `chain` - The entire processed blockchain

Example:

```json
{
    "chain": [
        {
            "index": 0,
            "proof": 0,
            "timestamp": 1611567424713,
            "blockHash": "b393ebd795aa7ad8e9b4775684ae9becde42d4eb267b60d82be92e3ae4fa0b82",
            "previousBlockHash": "1",
            "documents": []
        },
        {
            "index": 1,
            "proof": 5287558363.085768,
            "timestamp": 1611567482252,
            "blockHash": "32073aaca750ac0e29a04851dfad7ccef7728c0008a3e1a84c30e209997fa0bb",
            "previousBlockHash": "b393ebd795aa7ad8e9b4775684ae9becde42d4eb267b60d82be92e3ae4fa0b82",
            "documents": [
                {
                    "system": "HR Dossiers",
                    "data": {
                        "title": "Dossier 1"
                    }
                },
                {
                    "system": "HR Dossiers",
                    "data": {
                        "title": "Dossier 2"
                    }
                }
            ]
        }
    ]
}
```
