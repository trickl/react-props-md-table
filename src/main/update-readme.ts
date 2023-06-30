import fs from "fs";
import path from "path";
import chalk from "chalk";

const replaceRegex = /<!-- props-table-start -->[\s\S]*<!-- props-table-end -->/m;

export const updateReadme = (
  readme: string,
  propsTable: string,
  force: boolean
) => {
  try {
    let readmeContent = "";

    if (!fs.existsSync(readme)) {
      console.warn(chalk.yellow(`${readme} not found.`));
    } else {
      readmeContent = fs.readFileSync(
        path.resolve(process.cwd(), readme),
        "utf-8"
      );
    }

    if (readmeContent.match(replaceRegex)) {
      const result = readmeContent.replace(
        replaceRegex,
        "<!-- props-table-start -->\n" + propsTable + "<!-- props-table-end -->"
      );

      fs.writeFile(readme, result, "utf-8", (e) => {
        if (e) {
          return console.error(
            chalk.red(`Error updating propsTable in ${readme}: ${e}`)
          );
        } else {
          return console.log(chalk.green(`${readme} updated successfully.`));
        }
      });
    } else {
      if (force) {
        const result =
          readmeContent +
          "\n\n<!-- props-table-start -->\n" +
          propsTable +
          "<!-- props-table-end -->";

        fs.writeFile(readme, result, "utf-8", (e) => {
          if (e) {
            return console.error(
              chalk.red(`Error updating propsTable in ${readme}: ${e}`)
            );
          } else {
            return console.log(
              chalk.green(`${readme} force updated successfully.`)
            );
          }
        });
      } else {
        console.warn(
          chalk.yellow(`Could not find propsTable to replace in ${readme}\n`),
          "The props table needs to be wrapped between <!-- props-table-start --> and <!-- props-table-end -->\n",
          "or use with --force to add to the end of the file"
        );
      }
    }
  } catch (e) {
    console.error(chalk.red(`Error updating propsTable in ${readme}: ${e}`));
  }
};
