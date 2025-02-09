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
    uri: "https://amber-secure-egret-840.mypinata.cloud/ipfs/bafkreifaaov3dvhjc6q4icaxrzemhnun3dte76kdi3ab6i2zngap77yvxy",
    
  };




const mintSecret=[
  35, 140, 224,  69, 174, 229,  63,  82,  26, 122, 150,
 157,  47,   9,   7, 214, 196, 176,  42, 252,  73,  13,
 100, 152,   2, 204,  64,  30, 237, 215, 122, 219, 122,
 247, 233,   9,  53,  16,  39,  78, 162,  17, 116, 185,
 230,  50,  19, 188,  80, 159, 108, 233,  68,  82, 205,
 176,   2,  48,  15, 144, 141, 132,  89,  65
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

creatTokenWithMint()




