import clipboard from "clipboardy";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { blue, red } from "ansicolor";
import fetch from "node-fetch";

const argv = yargs(hideBin(process.argv)).argv;

let pwdFull = "";
const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]`;
const charactersLength = characters.length;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
let url = "https://raw.githubusercontent.com/dwyl/english-words/49a0d9e8a40f5a0177d7c952ce1537a60c5cf256/words_dictionary.json";
let settings = { method: "Get" };

console.log("Node rocks!");

function generatePassword(length = 8) {
  let result = "";
  if(argv.s){
    while (!/\d/.test(result) && !specialChars.test(result)) {
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    }
  } else {
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }    
  }
  return result;
}

function generatePasswordWords(nbWords) {
  fetch(url, settings)
    .then((res) => res.json())
    .then((dico) => {
      const keys = Object.keys(dico);
      let pwdWords = "";
      let colorId = "true";
      for (let i = 0; i < nbWords; i++) {
        const prop = keys[Math.floor(Math.random() * keys.length)];
        if (colorId) {
          process.stdout.write(prop.blue);
        } else {
          process.stdout.write(prop.red);
        }
        colorId = !colorId;
        pwdWords += prop;
      }
      process.stdout.write("\n");
    });
}

clipboard.writeSync(generatePassword(argv.lengthpwd));

pwdFull = clipboard.readSync();

for (let i = 0; i < pwdFull.length; i++) {
  if (/\d/.test(pwdFull[i])) {
    process.stdout.write(pwdFull[i].red);
  } else if (specialChars.test(pwdFull[i])) {
    process.stdout.write(pwdFull[i].blue);
  } else {
    process.stdout.write(pwdFull[i]);
  }
}
process.stdout.write("\n");

if(argv.c)generatePasswordWords(5);
