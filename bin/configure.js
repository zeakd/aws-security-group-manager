#! /usr/bin/env node

const program = require('commander');
console.log('here');
setTimeout(function () {
  console.log('async')
}, 3000)