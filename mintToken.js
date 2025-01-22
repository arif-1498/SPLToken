const web3 = require("@solana/web3.js");
const helper = require("./helpers");

const splToken = require("@solana/spl-token");
console.log(splToken.TOKEN_PROGRAM_ID);

const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./data.json"));
const SecretKeys = Uint8Array.from(data.SecretKey);

const payer = web3.Keypair.fromSecretKey(SecretKeys);

const datas = JSON.parse(fs.readFileSync("./Datas.json"));
console.log(datas.mintAc);

const mint = new web3.PublicKey(datas.mintAc);
console.log(mint);

const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);

async function MintToken() {
  const TokenAcccount = await splToken.getOrCreateAssociatedTokenAccount(
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
  const mintinfo = await splToken.getMint(connection, mint);
  console.log("Mint account info is :", mintinfo);
}

console.log("balacnce after mint");
getBalance();
getMintinfo();
