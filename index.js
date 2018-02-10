#!/usr/bin/env node
const reactDocs = require('react-docgen');
const fs = require('fs');
const path = require('path');

const filename = process.argv[process.argv.length - 1];
const content = fs.readFileSync(path.resolve(process.cwd(), filename), 'utf-8');

const component = reactDocs.parse(content);
console.log('| Property | PropType | Required | Default | Description |');
console.log('|----------|----------|----------|---------|-------------|');
for (const name of Object.keys(component.props)) {
  const { type, required, description, defaultValue } = component.props[name];
  console.log(`| ${name} | \`${formatType(type)}\` | ${required ? 'yes' : ''} | ${defaultValue != null ? `\`${defaultValue.value}\`` : ''} | ${description} |`);
}

function formatType (type) {
  if (type.name === 'union') {
    return type.value.map(formatType).join('|');
  } else {
    return type.name;
  }
}
