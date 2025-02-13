import {
    MPL_TOKEN_METADATA_PROGRAM_ID,
    createMetadataAccountV3,
    updateMetadataAccountV2, 
    mplTokenMetadata,
    createAndMint,
    TokenStandard, updateV1
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
    name: "Gold Coin",
    symbol: "GTC",
    uri: "https://ipfs.io/ipfs/bafkreiblbltan6lkthnvdchqv3vd7ybev75rf6hotta3xuev4yfva2jwum",
    
  };




const mintSecret=  [
  124, 196, 119,  30,  43, 250, 250, 128,  19,   0,  47,
   42, 184, 223, 179, 159,  54,  99, 123,  40, 222,  26,
   55, 203,  66,  10,  39, 172, 153,  38, 125, 106, 168,
  253,  37,  52,  27,  95, 221, 195, 191, 109, 127,  93,
  115, 141,  88,  48, 199, 106, 144, 126,  91, 184,  65,
  174,  57,  24,  97, 147,  53, 218, 227, 146
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

async function updataMetadata(){
  try {
    const updateIx= updateV1(umi, {
      mint:mintAddress, 
      newUpdateAuthority: payer.publicKey,
      data: tokenData, 
      
    })
  } catch (error) {
    
  }
}

creatTokenWithMint()












