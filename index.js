#!/usr/bin/env node
const path = require('path');
const buildPropsTable = require('./build-props-table');
const writeReadme = require('./write-readme');
const argv = require('yargs')
  .usage('Usage: $0 <filename> [options]')
  .boolean(['toConsole', 'force'])
  .describe('toConsole', 'Outputs props table to command line instead of readme')
  .describe('force', 'Add props table at end of file if no table is found to be replaced. A new readme.md will be created if it does not exist.')
  .demandCommand(1)
  .alias('h', 'help')
  .alias('v', 'version')
  .argv

const filename = argv._[0];
const toConsole = argv.toConsole;
const force = argv.force;
const readme = path.dirname(filename) + '/readme.md';
const regex = /<!-- props-table-start -->[\s\S]*<!-- props-table-end -->/m;

const propsTable = buildPropsTable(filename);

if (toConsole) {
  console.log(propsTable);
  process.exit(1);
}

if (propsTable) {
  writeReadme(readme, propsTable, regex, force);
}
