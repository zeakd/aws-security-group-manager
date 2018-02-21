#! /usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('configure', 'manage working-space configure json file')
  .command('add', 'add ip as woring space')
  .command('remove', 'remove ip from working space')
  .parse(process.argv)

