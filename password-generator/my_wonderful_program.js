import clipboard from "clipboardy";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { blue, red } from 'ansicolor';
const argv = yargs(hideBin(process.argv)).argv;

console.log("Node rocks!");

let result = "";
const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]`;
const charactersLength = characters.length;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function generatePassword(length) {

  while((!/\d/.test(result) && !specialChars.test(result))){
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  }

  return result;
}

clipboard.writeSync(generatePassword(argv.lengthpwd));

let pwdFull = clipboard.readSync();

for(let i = 0; i < pwdFull.length; i++) {
    if(/\d/.test(pwdFull[i])){
        process.stdout.write((pwdFull[i]).red)        
    }else if(specialChars.test(pwdFull[i])){
        process.stdout.write((pwdFull[i]).blue)
    }else {
        process.stdout.write((pwdFull[i]))
    }
      
}
process.stdout.write("\n")
