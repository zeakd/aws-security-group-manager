#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

const REGEXP_IP = /^(0|[1-9]\d{0,2})\.(0|[1-9]\d{0,2})\.(0|[1-9]\d{0,2})\.(0|[1-9]\d{0,2})$/;

program
  .usage('[ip]')
  .option('-c --current-ip', 'use current external ip')
  .option('-p --profile [name]', 'use aws [name] profile credential')

program.parse(process.argv)

let ip;
if (program.currentIp) {
  ip = program.currentIp;
} else if (program.args.length > 0) {
  ip = program.args[0];
} else {
  
}

const profile = program.profile ? program.profile : 'default';
const workspaceConfig = fs.readJsonSync(path.resolve(__dirname, `../profiles/${profile}.json`));

inquirer.prompt([
  {
    type: 'checkbox',
    message: 'Select Rules',
    name: 'rules',
    choices: workspaceConfig.configureList.map(({ 
      description,
      rule
    }, idx) => ({
      key: idx,
      name: description, 
      value: rule,
    })),
    validate: function (answer) {
      if (answer.length < 1) {
        return 'You must choose at least one rule.';
      }
      return true;
    }
  }
]).then(function (answers) {
  console.log(answers);
}).catch(function (e) {
  console.log(e);
});
