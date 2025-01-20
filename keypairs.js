const Web3 = require("@solana/web3.js");
const fs = require("fs");
const Fs =require('fs');

const { Keypair } = Web3;

const connection = new Web3.Connection(
  Web3.clusterApiUrl("devnet"),
  "confirmed"
);

const payer = Keypair.generate();

console.log ("public key of payers: ", payer.publicKey)
console.log( "payer's Secret key: ", payer.secretKey)

const data = {
  publicKey:payer.publicKey,
  SecretKey:Array.from(payer.secretKey),
};
console.log( data)

Fs.writeFileSync('./data.json', JSON.stringify(data))

//fs.writeFileSync("./data.json", JSON.stringify(data, null, 2));
