import {fetchAllDigitalAsset, mplTokenMetadata, fetchDigitalAsset} from "@metaplex-foundation/mpl-token-metadata";
import{PublicKey, clusterApiUrl, Keypair} from "@solana/web3.js"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { none, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { fromWeb3JsKeypair, fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters'
import {readFileSync,  writeFileSync, existsSync} from "fs";

const umi = createUmi(clusterApiUrl("devnet")).use(
    mplTokenMetadata()
)
const data = JSON.parse(readFileSync("./data.json"));
const SecretKeys = Uint8Array.from(data.SecretKey);
const payer = Keypair.fromSecretKey(SecretKeys);
const signer= createSignerFromKeypair(umi, fromWeb3JsKeypair(payer));
umi.use(signerIdentity(signer, true))
const mintPK=  new PublicKey("9QP8uZPTp8mfjZjFNGtgQYcdRkstKFKFMA85ZWsNwxRu"); 

//const mint = fromWeb3JsPublicKey(mintPK)
(async()=>{
    const asset = await fetchDigitalAsset(umi, mintPK)
    console.log("asset:", asset)
})()