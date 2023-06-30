import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { builtinResolvers, parse } from 'react-docgen';

import { addLine } from '../utils/add-line';
import { formatType } from '../utils/format-type';
import { nlToBr } from '../utils/nl-to-br';
import { stripComments } from '../utils/strip-comments';

export const buildPropsTable = (filename: string) => {
  try {
    const content = fs.readFileSync(
      path.resolve(process.cwd(), filename),
      'utf-8'
    );
    const components = parse(content, {
      resolver: new builtinResolvers.FindExportedDefinitionsResolver(),
    });

    let propsTable = '';

    components.forEach((component) => {
      const title =
        components.length > 1
          ? `## ${component.displayName || ''} Properties`
          : '## Properties';
      propsTable = addLine(propsTable, title);
      propsTable = addLine(propsTable);

      if (component.props) {
        propsTable = addLine(
          propsTable,
          '| Property | PropType | Required | Default | Description |'
        );
        propsTable = addLine(
          propsTable,
          '|----------|----------|----------|---------|-------------|'
        );

        for (const name of Object.keys(component.props)) {
          const propTypeDescriptor = component.props[name];
          if (propTypeDescriptor == null) {
            console.warn('propTypeDescriptor is null for', name);
            return;
          }
          const { type, required, description, defaultValue } =
            propTypeDescriptor;
          propsTable = addLine(
            propsTable,
            `| ${name} | \`${formatType(type)}\` | ${required ? 'yes' : ''} | ${
              defaultValue != null
                ? `\`${nlToBr(
                    stripComments(String(defaultValue?.value)),
                    true
                  )}\``
                : ''
            } | ${nlToBr(description ?? '')} |`
          );
        }
      } else {
        propsTable = addLine(propsTable, 'This component has no properties');
      }

      propsTable = addLine(propsTable);
    });

    return propsTable;
  } catch (e) {
    console.error(
      chalk.red(
        `Can't extract props data from file ${filename}: ${
          (e as Error).message
        }`
      )
    );
    return null;
  }
};
