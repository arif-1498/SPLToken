import {
  MPL_TOKEN_METADATA_PROGRAM_ID,
  createMetadataAccountV3,
  mplTokenMetadata,
  updateMetadataAccountV2,
  createAndMint,
} from "@metaplex-foundation/mpl-token-metadata";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  none,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import {
  fromWeb3JsKeypair,
  fromWeb3JsPublicKey,
} from "@metaplex-foundation/umi-web3js-adapters";
import {
  PublicKey,
  Connection,
  clusterApiUrl,
  Transaction,
  sendAndConfirmRawTransaction,
  sendAndConfirmTransaction,
  Keypair,
} from "@solana/web3.js";

const umi = createUmi(clusterApiUrl("devnet")).use(mplTokenMetadata());

const data = JSON.parse(readFileSync("./data.json"));
const SecretKeys = Uint8Array.from(data.SecretKey);
const payer = Keypair.fromSecretKey(SecretKeys);
const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(payer));
umi.use(signerIdentity(signer, true));
console.log("signer is : ", signer);

const tokenmetadata = {
  name: "Pak Golden Coin",
  symbol: "PGC",
  uri: "https://amber-secure-egret-840.mypinata.cloud/ipfs/bafkreifaaov3dvhjc6q4icaxrzemhnun3dte76kdi3ab6i2zngap77yvxy",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const updatedmetadata = {
  name: "PAK GOLD COIN",
  symbol: "PKGC",
  uri: "https://raw.githubusercontent.com/arif-1498/TokenData/main/metadatas.json",
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
};

const tokenImage =
  "https://raw.githubusercontent.com/arif-1498/TokenData/main/metadatas.json";

const datas = JSON.parse(readFileSync("./Datas.json"));
console.log(datas.mintAc);

const mintPK = new PublicKey(datas.mintAc);
const mint = fromWeb3JsPublicKey(mintPK);

async function addMetadata() {
  try {

    

    const metadatainstruction = createMetadataAccountV3(umi, {
      mint: mint,
      mintAuthority: signer,
      data: updatedmetadata,
      isMutable: true,
      collectionDetails: null,
    });

    const trx = await metadatainstruction.buildAndSign(umi);
    const signature = await umi.rpc.sendTransaction(trx);

    console.log("signature", signature);
  } catch (error) {
    console.log("errors :", error);
  }
}

const metaDataProgramId= new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID)


const MetadataPID = fromWeb3JsPublicKey(metaDataProgramId);
const metadataAccount = umi.eddsa.findPda(MetadataPID, [
  Buffer.from("metadata"),
  MetadataPID.toBuffer(),
  mint.toBuffer(),
]);


async function updateTokenMetadata() {
  try {
    const updateMetadataAccountV2Args = {
      metadata: fromWeb3JsPublicKey(new PublicKey(metadata.publicKey)), //Replace with the PublicKey or PDA of the metadata account you want to update
      updateAuthority: umi.identity,
      data: {
        name: offChainMetadata.name,
        symbol: offChainMetadata.symbol,
        uri: "https://ipfs.io/ipfs/QmNunKefNdgQh6XHCAqcjcta5uxf9gaNGWvJPahQsxGjHb", //Replace with the actual URL of the metadata uploaded on publicly accessible storage
        sellerFeeBasisPoints: 0,
        creators: metadata.creators, //Verified creators couldn't be changed
        collection: null,
        uses: null
      }
    }
  
    const instruction = updateMetadataAccountV2(
      umi,
      updateMetadataAccountV2Args
    )
    const trx = await updateInstruction.buildAndSign(umi);
    const signature = await umi.rpc.sendTransaction(trx);
    console.log("Metadata updated. Signature:", signature);
   

  } catch (error) {
    console.log("error:", error);
  }
}

updateTokenMetadata();
