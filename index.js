#!/usr/bin/env node
const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const formatType = (type) => (
  type.name === 'union'
    ? type.value.map(formatType).join(' || ')
    : type.name
);

const nlToBr = (str, addQuotes = false) => (
  str.replace(/\r\n|\r|\n/gi, addQuotes ? '`<br>`' : '<br>')
);

const filename = process.argv[process.argv.length - 1];

try {
  const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');
  const components = reactDocs.parse(content, reactDocs.resolver.findAllComponentDefinitions);

  components.forEach((component) => {

    const title = components.length > 1 ? `## ${component.displayName || ''} Properties` : '## Properties';
    console.log(title);
    console.log('');

    if (component.props) {
      console.log('| Property | PropType | Required | Default | Description |');
      console.log('|----------|----------|----------|---------|-------------|');

      for (const name of Object.keys(component.props)) {
        const { type, required, description, defaultValue } = component.props[name];
        console.log(`| ${name} | \`${formatType(type)}\` | ${required ? 'yes' : ''} | ${defaultValue != null ? `\`${nlToBr(defaultValue.value, true)}\`` : ''} | ${nlToBr(description)} |`);
      }
    } else {
      console.log('This component has no properties');
    }

    console.log('');
  });
} catch (e) {
  console.warn(`Can't extract props data from file ${filename}: ${e.message}`);
}
