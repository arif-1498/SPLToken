import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { writeFileSync } from "fs";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const payer = Keypair.generate();

console.log("public key of payers: ", payer.publicKey);
console.log("payer's Secret key: ", payer.secretKey);

const data = {
  publicKey: payer.publicKey,
  SecretKey: Array.from(payer.secretKey),
};
console.log(data);

writeFileSync("./data.json", JSON.stringify(data));

//fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
