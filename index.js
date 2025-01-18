const web3=require('@solana/web3.js')



const payer = web3.Keypair.generate();


const mint = web3.Keypair.generate();


const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

console.log("payer kepair:", payer);

console.log("payer kepair:", mint);


async function sendSol() {
    try {
        if (!(payer.publicKey instanceof web3.PublicKey)) {
            console.log('wallet.publicKey is not a valid PublicKey');
        }
        signatiuretx = await connection.requestAirdrop(
            connection,
            payer.publicKey,
            2 * web3.LAMPORTS_PER_SOL
          );
         await  connection.confirmTransaction(signatiuretx, "confirmed")
          console.log("Airdrop signature; ", signatiuretx)
        
        
    } catch (error) {
        console.log("transaction failed", error)
        
    }
}


sendSol();
