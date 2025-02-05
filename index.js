import {
  PublicKey,
  Connection,
  clusterApiUrl,
  Transaction,
  sendAndConfirmRawTransaction,
  sendAndConfirmTransaction,
  Keypair,
} from "@solana/web3.js";
import {
  createMint,
  createAccount,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  getMint,
} from "@solana/spl-token";
import {readFileSync,  writeFileSync, existsSync} from "fs";
import {
  MPL_TOKEN_METADATA_PROGRAM_ID,
  createMetadataAccountV3,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {none,createSignerFromKeypair,  } from "@metaplex-foundation/umi";
import {fromWeb3JsKeypair} from '@metaplex-foundation/umi-web3js-adapters'

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");


const umi = createUmi(clusterApiUrl("devnet")).use(
  mplTokenMetadata()
)
const data = JSON.parse(readFileSync("./data.json"));
const SecretKeys = Uint8Array.from(data.SecretKey);
const payer = Keypair.fromSecretKey(SecretKeys);
const signer= createSignerFromKeypair(umi, fromWeb3JsKeypair(payer));
umi.identity=signer;
console.log("signer is : ", signer)

console.log(payer);
console.log("payer public key:", payer.publicKey.toBase58());

async function checkbalance() {
  const AccountBalance = await connection.getBalance(payer.publicKey);
  console.log("balance is ", AccountBalance);
}

const metadataProgramId = new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID);
  

function storageData(value) {
  if (!existsSync("./Datas.json")) {
    console.log("path not found");
  }
  try {
    const data = {
      dummy: value,
      mintAc: null,
      transaction: [],
    };
    writeFileSync("./Datas.json", JSON.stringify(data));
    console.log("Data stored Successfully");
  } catch (error) {
    console.log("not storing data", error);
  }
}

function addTransaction(signatiuretx) {
  const Datas = JSON.parse(readFileSync("./Datas.json"));
  Datas.transaction.push(signatiuretx);

  writeFileSync("./Datas.json", JSON.stringify(Datas));
  console.log("Transaction stored Successfully..");
}




async function creatToken() {
  try {
    const mintAddress = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6
    );

    console.log("mint address:", mintAddress.toBase58());
    console.log("mint:", mintAddress);
    const Datas = JSON.parse(readFileSync("./Datas.json"));
    Datas.mintAc = mintAddress;
    writeFileSync("./Datas.json", JSON.stringify(Datas));
    console.log("mint address store successfully...");
  } catch (error) {
    console.log("token creation failed:", error);
  }
}



creatToken()


(async ()=>{
  const mintAc = new PublicKey(
    "AgxeRiwhUT3ZCBq9d7USZSbhXdS86XhKih2zqkGeboMa"
  );
  const tokeninfo = await connection.getAccountInfo( mintAc )
  console.log("token infor : " , tokeninfo)
})()

