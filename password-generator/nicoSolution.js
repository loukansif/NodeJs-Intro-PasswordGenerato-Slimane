#!/usr/bin/env node

import clipboard from "clipboardy";
import ansi from "ansi-colors";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// ############ CONSTANTES ############
const ALPHANUMERICS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "><$%()";

// ############ FONCTIONS ############
const shuffle = (str) => [...str].sort(() => Math.random() - 0.5).join(""); // https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript

const generatePassword = (length, characters) => {
  // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const displayLetter = (letter) => {
  if (SYMBOLS.includes(letter)) {
    // on regarde si le tableau SYMBOLS contient la lettre
    letter = ansi.green(letter);
  } else if (NUMBERS.includes(letter)) {
    letter = ansi.red(letter);
  }
  process.stdout.write(letter);
};

// ############ LOGIQUE DU PROGRAMME ############
yargs(hideBin(process.argv))
  .command(
    "pwgen",
    "generate password",
    () => {},
    (argv) => {
      // console.info("longueur pwd :" + argv._[1])

      let pwd = generatePassword(argv._[1], ALPHANUMERICS + SYMBOLS + NUMBERS); // le mot de passe peut avoir des caracteres alpha/symbols/numbers
      pwd = shuffle(pwd);

      if (argv.n) {
        console.log("Ajout d'un nombre !");
        pwd += generatePassword(1, NUMBERS);
      }
      if (argv.s) {
        console.log("Ajout d'un symbole !");
        pwd += generatePassword(1, SYMBOLS);
      }
      if (argv.c) {
        console.log("Mot de passe copié dans le presse-papiers !");
        clipboard.writeSync(pwd);
      }

      // Afficher mot de passe en couleur
      for (let letter of pwd) {
        // on itère sur chaque lettre du mot de passe
        displayLetter(letter);
      }
      process.stdout.write("\n");

      for (let letter of pwd) {
        // on itère sur chaque lettre du mot de passe
        displayLetter(letter);
      }
      process.stdout.write("\n");
    }
  )
  .option("number", {
    alias: "n",
    type: "boolean",
    description: "Add a number in password",
  })
  .option("symbol", {
    alias: "s",
    type: "boolean",
    description: "Add a symbol in password",
  })
  .option("copy", {
    alias: "c",
    type: "boolean",
    description: "Copy password to clipboard",
  })
  .help()
  .demandCommand(1)
  .parse();
