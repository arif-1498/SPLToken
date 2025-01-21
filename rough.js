async function checkbalance(){
    const AccountBalance=await connection.getBalance(payer.publicKey)
    console.log("balance is ", AccountBalance)
}


async function sendSol() {
    try {
        if (!(payer.publicKey instanceof web3.PublicKey)) {
            console.log('wallet.publicKey is not a valid PublicKey');
        }
         const balance = await connection.getBalance(payer.publicKey)
        console.log("balance before::", balance)

        signatiuretx = await connection.requestAirdrop(
            payer.publicKey,
            2 * web3.LAMPORTS_PER_SOL
          );
         await  connection.confirmTransaction(signatiuretx, "confirmed")
          console.log("Airdrop signature; ", signatiuretx)
          const balanceAfter = await connection.getBalance(payer.publicKey)
          console.log("balance After::", balanceAfter)
        
        
    } catch (error) {
        console.log("transaction failed", error)
        
    }

}




async function creatToken(){
    try{

        const mintAddress=await createMint(
            connection,
            payer,
            payer.publicKey, 
            null,
            6,
        )

        console.log("mint address:", mintAddress.toBase58());
    }
    catch(error){

        console.log("token creation failed:", error)

    }
}
