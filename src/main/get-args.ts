import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

interface ReactPropsMdTabeArgs {
  filename: string;
  toConsole: boolean;
  force: boolean;
  readme: string;
}

export const getArgs = (): ReactPropsMdTabeArgs => {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 <filename> [options]')
    .boolean(['to-console', 'force'])
    .describe(
      'to-console',
      'Outputs props table to command line instead of readme'
    )
    .describe(
      'force',
      'Add props table at end of file if no table is found to be replaced. A new readme.md will be created if it does not exist.'
    )
    .demandCommand(
      1,
      'You need to provide a file to extract the props table from.'
    )
    .alias('h', 'help')
    .alias('v', 'version')
    .parseSync();

  const filename = argv['_'][0] as string;
  const toConsole = argv['to-console'] ?? false;

  const force: boolean = argv.force ?? false;
  const readme = path.dirname(filename) + '/readme.md';

  return {
    filename,
    toConsole,
    force,
    readme,
  };
};
