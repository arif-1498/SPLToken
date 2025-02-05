import {
    MPL_TOKEN_METADATA_PROGRAM_ID,
    createMetadataAccountV3,
    updateMetadataAccountV2, 
    mplTokenMetadata,
    updateMetadataAccountV2, 
    createAndMint
} from "@metaplex-foundation/mpl-token-metadata";
import {readFileSync,  writeFileSync, existsSync} from "fs";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { none, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
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

const tokenmetadata = {
    name: "Pak Rupees Token",
    symbol: "PKRT",
    uri: "https://amber-secure-egret-840.mypinata.cloud/ipfs/bafybeiaqq4koq4tmbmry7mhxnwficfdyoezs7jwe224ab36n3ktizjnsay",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  const updatedmetadata = {
    name: "Gold PKR Token",
    symbol: "PKTC",
    uri: "https://amber-secure-egret-840.mypinata.cloud/ipfs/bafkreiefrfaxznrvs45ahlcwuzuy63lg2wjl3ktorhtohfud3eqng5e4uq",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  const tokenImage="https://ipfs.io/ipfs/bafybeifwiym4fv77z7qejnvarsnypocqliswwwpaomyysxbtwldakdqwla"

  async function addMetadata() {
    try {
      const mintAc = new PublicKey(
        "9QP8uZPTp8mfjZjFNGtgQYcdRkstKFKFMA85ZWsNwxRu"
      );

      const mint= fromWeb3JsPublicKey(mintAc)
  
      const metadatainstruction = createMetadataAccountV3(umi, {
        mint: mint,
        mintAuthority: signer,
        data: updatedmetadata,
        data: updatedmetadata,
        isMutable: true,
        collectionDetails: null,
        
      })

      const trx = await metadatainstruction.buildAndSign(umi);
      const signature= await umi.rpc.sendTransaction(trx);
       
      console.log("signature", signature)
      

    } catch (error) {
      console.log("errors :", error);
    }
  }

  async function updataMetadat(){
    const updataIntructions= updateMetadataAccountV2(umi, {
        
        
    })
  }


  (async ()=>{
   try {
   const Ix = createAndMint()
    
   } catch (error) {
    
   }


  })()

  
