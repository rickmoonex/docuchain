import crypto from "crypto";

export function generateProof(previousProof: number): Promise<unknown> {
    return new Promise((resolve) => {
        setImmediate(async () => {
            const proof = Math.random() * 10000000001;
            const dontProcess = process.env.BREAK;
            if (isProofValid(previousProof, proof) || dontProcess === "true") {
                resolve({ proof, dontProcess });
            } else {
                resolve(await generateProof(previousProof));
            }
        });
    });
}

export function isProofValid(previousProof: number, currentProof: number): boolean {
    const difference = currentProof - previousProof;
    const proofString = `difference-${difference}`;
    const hashFunction = crypto.createHash("sha256");
    hashFunction.update(proofString);
    const hexString = hashFunction.digest("hex");
    if (hexString.includes("000000")) {
        return true;
    }
    return false;
}
