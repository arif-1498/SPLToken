const web3=require('@solana/web3.js');
const {PublicKey}=web3;
const splTokens=require('@solana/spl-token');

const {TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount}=splTokens;


const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");



