#!/usr/bin/env node --harmony

const chalk = require('chalk');
const prompt = require('prompt-sync')();
const fs = require('fs');
const path = require('path');
const version = require('./package.json').version;
const program = require('commander');

const currentPath = process.cwd();

program
  .version(version)
  .usage('[options]')
  .option('-a, --app <app>', 'Application name')
  .option('-u, --update', 'Update the installed applications paths')
  .option('-d, --default <application>', 'Change the default application')
  .parse(process.argv);

let loader;
switch (process.platform) {
  case 'darwin':
    loader = require('./loaders/darwin.js');
    break;
  case 'win32':
    loader = require('./loaders/win32.js');
    break;
  default:
    loader = require('./loaders/default.js');
}

if (program.update) {
  loader.updateConfig();
} else if (program.app) {
  console.error(chalk.red('Not implemented yet'), program.app);
} else if (program.default) {
  console.error(chalk.red('Not implemented yet'), program.default);
} else {
  loader.loadUserConfig();

  const ideaFilename = path.join(currentPath, '.idea');
  if (fs.existsSync(ideaFilename)) {
    loader.openApplicationByIdeaFile(ideaFilename);
  } else {
    console.error(chalk.red(currentPath + ' is not an idea folder.'));
    const openNonIdeaFolder = prompt('Are you sure to open? Y/N ');
    if (openNonIdeaFolder.toLowerCase() === 'y') {
      loader.openAppByProjectSources(currentPath);
    }
  }
}
