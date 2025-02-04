import {Connection, PublicKey, clusterApiUrl, Keypair} from "@solana/web3.js";
import {TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, getMint, mintTo} from "@solana/spl-token";
import {readFileSync, writeFileSync} from "fs";

import {addTransaction} from "./helpers.js";



const data = JSON.parse(readFileSync("./data.json"));
const SecretKeys = Uint8Array.from(data.SecretKey);

const payer = Keypair.fromSecretKey(SecretKeys);

const datas = JSON.parse(readFileSync("./Datas.json"));
console.log(datas.mintAc);

const mint = new PublicKey(datas.mintAc);
console.log(mint);

const connection = new Connection(
  clusterApiUrl("devnet"),
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
    const mintSignature = await mintTo(
      connection,
      payer,
      mint,
      TokenAcccount.address,
      payer.publicKey,
      1000 * 10 ** 6
    );
    addTransaction(mintSignature);
  } catch (error) {}
}

async function getBalance() {
  const TokenAcccount = await getOrCreateAssociatedTokenAccount(
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

