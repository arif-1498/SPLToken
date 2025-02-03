import {readFileSync, writeFileSync} from "fs";


export function addTransaction(signature) {
  try {
    const Datas = JSON.parse(readFileSync("./Datas.json"));
    Datas.transaction.push(signature);
    writeFileSync("./Datas.json", JSON.stringify(Datas));
    console.log("Transaction stored Successfully..");
  } catch (error) {
    console.log("error: ", error);
  }
}

