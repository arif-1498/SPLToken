const web3 = require("@solana/web3.js");
const splTokens = require("@solana/spl-token");
const fs = require("fs");

const {
  TOKEN_PROGRAM_ID,
  getOrCreateAssociatedTokenAccount,
  transfer,
  createTransferInstruction,
} = splTokens;

const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);
const data = JSON.parse(fs.readFileSync("./data.json"));
const SecretKeys = Uint8Array.from(data.SecretKey);

const payer = web3.Keypair.fromSecretKey(SecretKeys);

const newwallet = web3.Keypair.generate();

const newSecretkey = [
  34, 205, 30, 8, 116, 187, 247, 22, 32, 83, 140, 169, 204, 125, 151, 29, 73,
  231, 149, 108, 89, 97, 124, 9, 18, 82, 139, 247, 118, 229, 136, 76, 83, 222,
  10, 195, 40, 165, 134, 205, 179, 8, 155, 129, 47, 225, 241, 79, 30, 2, 28, 73,
  46, 127, 70, 101, 190, 190, 129, 203, 161, 134, 51, 48,
];
const toSecrets = Uint8Array.from(newSecretkey);

const toAccount = web3.Keypair.fromSecretKey(toSecrets);

console.log("toAccount", toAccount);
const datas = JSON.parse(fs.readFileSync("./Datas.json"));
const mint = new web3.PublicKey(datas.mintAc);
console.log(mint);

async function getATA(publickey) {
  try {
    const TokenAcccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      publickey
    );

    return TokenAcccount.address;
  } catch (error) {
    console.log("unable to create ATA:", error);
  }

  console.log(TokenAcccount);
}

async function TransferToken(source, destination, Amount) {
  try {
    const tranferSignature = await transfer(
      connection,
      payer,
      source,
      destination,
      payer.publicKey,
      Amount * 10 ** 6
    );
    return tranferSignature;
  } catch (error) {
    console.log("unable to transfer Tokens", error);
  }
}

async function getBalance(tokenATA) {
  try {
    const balance = await connection.getTokenAccountBalance(tokenATA);
    return balance;
  } catch (error) {
    console.log("unable to fetch balance", error )
  }
}

(async () => {
  const toATA = await getATA(toAccount.publicKey);
  console.log("toATA Address", toATA);
  const fromATA = await getATA(payer.publicKey);
  console.log("fromAtta address", fromATA);
  const signaturetx = await TransferToken(fromATA, toATA, 100);
  console.log("successfully transfered:", signaturetx);

  const toATABalance= await getBalance(toATA)
  console.log("to ATA balance balance", toATABalance)
  const fromATABalance= await getBalance(fromATA)
  console.log("frome ATA balance", fromATABalance)
  
  
})();
