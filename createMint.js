import {
    MPL_TOKEN_METADATA_PROGRAM_ID,
    createMetadataAccountV3,
    updateMetadataAccountV2, 
    mplTokenMetadata,
    createAndMint,
    TokenStandard
} from "@metaplex-foundation/mpl-token-metadata";
import {readFileSync,  writeFileSync, existsSync} from "fs";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { none, createSignerFromKeypair, signerIdentity,generateSigner, } from "@metaplex-foundation/umi";
import { fromWeb3JsKeypair, fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
import {
    PublicKey,
    Connection,
    clusterApiUrl,
    Transaction,
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction,
    Keypair,
  } from "@solana/web3.js";



const umi = createUmi(clusterApiUrl("devnet")).use(
    mplTokenMetadata()
)

const data = JSON.parse(readFileSync("./data.json"));
const SecretKeys = Uint8Array.from(data.SecretKey);
const payer = Keypair.fromSecretKey(SecretKeys);
const signer= createSignerFromKeypair(umi, fromWeb3JsKeypair(payer));
umi.use(signerIdentity(signer, true))
console.log("signer is : ", signer)


  const tokenData = {
    name: "PK Golden Coin",
    symbol: "PKGT",
    uri: "https://raw.githubusercontent.com/arif-1498/TokenData/main/metadatas.json",
    
  };




const mintSecret=[
  203, 231, 219, 147, 227, 207, 183,   6,  4, 184, 220,
  156, 106, 228, 250, 187,  33, 228, 147, 93, 226,  87,
  142,  84, 229,  61, 227, 158,  37,  52, 44,  57, 198,
  146, 182,  25,   3,  83, 212,  87, 228, 15,   6, 116,
  228, 125,  45, 161, 160, 133,  39,  31, 90, 166,  95,
  191, 227, 145, 124, 197, 234, 216,  74, 27
]


 //const newmint=generateSigner(umi)
 //console.log("new Mint: ",newmint)

  const mintKey = Uint8Array.from(mintSecret);
  const mint = Keypair.fromSecretKey(mintKey);
  const mintAddress=createSignerFromKeypair(umi, fromWeb3JsKeypair(mint))
  
console.log("the mint is", mintAddress)


async  function creatTokenWithMint(){
  try {
    const mintInstruction=createAndMint(umi, {
      mint: mintAddress, 
      authority:payer.publicKey,
      name: tokenData.name, 
      symbol:tokenData.symbol, 
      uri:tokenData.uri, 
      sellerFeeBasisPoints: 0,
      decimals: 6, 
      amount: 100000*10**6, 
      tokenOwner:payer.publicKey, 
      tokenStandard: TokenStandard.Fungible, 

  })

  const trasactions= await mintInstruction.buildAndSign(umi);
  const signaturetrx=  await umi.rpc.sendTransaction(trasactions)
  console.log(signaturetrx)
    
  } catch (error) {
    console.log("errors :", error)
  }
   

}

creatTokenWithMint();




