const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const stripComments = require('./strip-comments');
const formatType = require('./format-type');
const nlToBr = require('./nl-to-br');
const addLine = require('./add-line');

const buildPropsTable = (filename) => {
  try {
    const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');
    const components = reactDocs.parse(content, reactDocs.resolver.findAllExportedComponentDefinitions);

    let propsTable = '';

    components.forEach((component) => {
      const title = components.length > 1 ? `## ${component.displayName || ''} Properties` : '## Properties';
      propsTable = addLine(propsTable, title);
      propsTable = addLine(propsTable);

      if (component.props) {
        propsTable = addLine(propsTable, '| Property | PropType | Required | Default | Description |');
        propsTable = addLine(propsTable, '|----------|----------|----------|---------|-------------|');

        for (const name of Object.keys(component.props)) {
          const { type, required, description, defaultValue } = component.props[name];
          propsTable = addLine(propsTable, `| ${name} | \`${formatType(type)}\` | ${required ? 'yes' : ''} | ${defaultValue != null ? `\`${nlToBr(stripComments(defaultValue.value), true)}\`` : ''} | ${nlToBr(description)} |`);
        }
      } else {
        propsTable = addLine(propsTable, 'This component has no properties');
      }

      propsTable = addLine(propsTable);
    });

    return propsTable;
  } catch (e) {
    console.error(chalk.red(`Can't extract props data from file ${filename}: ${e.message}`));
    return null;
  }
}

module.exports = buildPropsTable;
