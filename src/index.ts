#!/usr/bin/env node
import { buildPropsTable } from "./main/build-props-table";
import { updateReadme } from "./main/update-readme";
import { getArgs } from "./main/get-args";

const {filename, toConsole, force, readme} = getArgs();

const propsTable = buildPropsTable(filename);

if (propsTable) {
  if (toConsole) {
    console.log(
      "<!-- props-table-start -->\n" + propsTable + "<!-- props-table-end -->"
    );
  } else {
    updateReadme(readme, propsTable, force);
  }
}