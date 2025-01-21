const web3=require('@solana/web3.js')
const splToken =require('@solana/spl-token');
const fs =require('fs');

const {createMint,createAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID}=splToken;

const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

const data= JSON.parse(fs.readFileSync("./data.json"))



const SecretKeys= Uint8Array.from(data.SecretKey);

console.log("the data is", data);
console.log(" secret key:", SecretKeys);
console.log("secret key size:",data.SecretKey.length);
const payer=web3.Keypair.fromSecretKey(SecretKeys);
console.log(payer);
console.log("payer public key:", payer.publicKey.toBase58())



async function checkbalance(){
    const AccountBalance=await connection.getBalance(payer.publicKey)
    console.log("balance is ", AccountBalance)
}
checkbalance();

function storageData( value){

    if(!fs.existsSync("./Datas.json")){
        console.log("path not found");
    }
    try {
        const data ={
            dummy:value,
            mintAc: null,
            transaction:[],
        }
        fs.writeFileSync("./Datas.json", JSON.stringify(data))
        console.log("Data stored Successfully")
    } catch (error) {
        console.log("not storing data", error)
    }
    
}

function addTransaction(signatiuretx){
    const Datas=JSON.parse(fs.readFileSync("./Datas.json"))
    Datas.transaction.push(signatiuretx)
    

    fs.writeFileSync("./Datas.json", JSON.stringify(Datas));
    console.log("Transaction stored Successfully..")
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
        console.log("mint:", mintAddress);
        const Datas=JSON.parse(fs.readFileSync("./Datas.json"))
        Datas.mintAc=mintAddress;
        fs.writeFileSync("./Datas.json", JSON.stringify(Datas))
        console.log ("mint address store successfully...")

    }
    catch(error){

        console.log("token creation failed:", error)

    }
}


























