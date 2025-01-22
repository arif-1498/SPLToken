const fs = require("fs");
console.log(fs);

function addTransaction(signature) {
  try {
    const Datas = JSON.parse(fs.readFileSync("./Datas.json"));
    Datas.transaction.push(signature);
    fs.writeFileSync("./Datas.json", JSON.stringify(Datas));
    console.log("Transaction stored Successfully..");
  } catch (error) {
    console.log("error: ", error);
  }
}
module.exports = { addTransaction };
