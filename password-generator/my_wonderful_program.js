import clipboard from "clipboardy";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;


// console.log(argv.lengthpwd)

console.log("Node rocks!");

function generatePassword(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

clipboard.writeSync(generatePassword(argv.lengthpwd));
console.log(clipboard.readSync());
