#!/usr/bin/env node
const path = require('path');
const buildPropsTable = require('./build-props-table');
const writeReadme = require('./write-readme');
const argv = require('yargs')
  .usage('Usage: $0 <filename> [options]')
  .boolean(['to-console', 'force'])
  .describe('to-console', 'Outputs props table to command line instead of readme')
  .describe('force', 'Add props table at end of file if no table is found to be replaced. A new readme.md will be created if it does not exist.')
  .demandCommand(1, 'You need to provide a file to extract the props table from.')
  .alias('h', 'help')
  .alias('v', 'version')
  .argv

const filename = argv._[0];
const toConsole = argv['to-console'];
const force = argv.force;
const readme = path.dirname(filename) + '/readme.md';
const regex = /<!-- props-table-start -->[\s\S]*<!-- props-table-end -->/m;

const propsTable = buildPropsTable(filename);

if (propsTable) {
  if (toConsole) {
    console.log('<!-- props-table-start -->\n' + propsTable + '<!-- props-table-end -->');
  } else {
    writeReadme(readme, propsTable, regex, force);
  }
}
