#!/usr/bin/env node
const commander = require("commander");
const clipboardy = require("clipboardy");
const chalk = require("chalk");

// npm link ^^

const createPassword = require("./utils/createPassword");
const savePassword = require("./utils/savePassword");

commander.version("1.0.0").description("Random Password Generator");

commander
  .option("-s, --save", "save password to passwords.txt")
  .option("-l, --length <number>", "show password's length", "8")
  .option("-nn, --no-numbers", "create password without numbers")
  .option("-ns, --no-symbols", "create password without symbols")
  .parse();

const { save, length, numbers, symbols } = commander.opts();

const generatePassword = createPassword(length, numbers, symbols);

if (save) {
  savePassword(generatePassword);
}

clipboardy.writeSync(generatePassword);
// clipboardy.write(generatePassword, () => {
//   console.log("Done");
// });

console.log(
  chalk.blueBright(`Generated Password ${chalk.bold.cyan(generatePassword)}`)
);
console.log(chalk.green("Password copied to clipboard"));
