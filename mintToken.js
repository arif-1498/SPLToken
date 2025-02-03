import {Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, getMint} from "@solana/spl-token";
import {readFileSync, writeFileSync} from "fs";

import {addTransaction} from "./helpers";



const data = JSON.parse(readFileSync("./data.json"));
const SecretKeys = Uint8Array.from(data.SecretKey);

const payer = web3.Keypair.fromSecretKey(SecretKeys);

const datas = JSON.parse(readFileSync("./Datas.json"));
console.log(datas.mintAc);

const mint = new PublicKey(datas.mintAc);
console.log(mint);

const connection = new Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);

async function MintToken() {
  const TokenAcccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );
  console.log("Token Account is : ", TokenAcccount);
  try {
    const mintSignature = await splToken.mintTo(
      connection,
      payer,
      mint,
      TokenAcccount.address,
      payer.publicKey,
      1000 * 10 ** 6
    );
    helper.addTransaction(mintSignature);
  } catch (error) {}
}

async function getBalance() {
  const TokenAcccount = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );

  const balance = await connection.getTokenAccountBalance(
    TokenAcccount.address
  );
  console.log("Token available:", balance.value.uiAmount);
}
async function getMintinfo() {
  const mintinfo = await getMint(connection, mint);
  console.log("Mint account info is :", mintinfo);
}

console.log("balacnce after mint");
getBalance();
getMintinfo();
