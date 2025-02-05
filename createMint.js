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
    name: "Gold PKR Token",
    symbol: "PKTC",
    uri: "https://amber-secure-egret-840.mypinata.cloud/ipfs/bafkreiefrfaxznrvs45ahlcwuzuy63lg2wjl3ktorhtohfud3eqng5e4uq",
    
  };

  const tokenImage="https://ipfs.io/ipfs/bafybeifwiym4fv77z7qejnvarsnypocqliswwwpaomyysxbtwldakdqwla"


const mintSecret=[
    192, 254, 111,  67, 181, 237, 247, 193, 116,  76,  22,
    220,  80, 224,  20, 232, 228, 129,  97, 222, 105,  28,
    103, 146,  79,  54, 141, 181,  68, 125, 177,  39, 222,
    194, 202,  25, 249,  41, 232,  34,  11,  32,  13,   1,
     66, 222, 138, 242,  53,  63, 125, 241,  91,  70, 103,
     16, 244, 110, 172, 167, 197, 242, 250, 124
  ]


  const mintKey = Uint8Array.from(mintSecret);
  const mint = Keypair.fromSecretKey(mintKey);
  const mintAddress=createSignerFromKeypair(umi, fromWeb3JsKeypair(mint))
  
console.log("the mint is", mintAddress)


async  function creatTokenWithMint(){
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

}

creatTokenWithMint()