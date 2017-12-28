const chalk = require('chalk');
const Utils = require("./utils");
const execSync = require("child_process").execSync;

module.exports = {
  configuration: null,

  openApplication(app) {
    switch (app) {
      case Utils.APPS.INTELLIJ:
        this.openIntelliJApp();
        break;
      case Utils.APPS.PHP_STORM:
        this.openPHPStormApp();
        break;
      case Utils.APPS.PY_CHARM:
        this.openPyCharmApp();
        break;
      case Utils.APPS.WEBSTORM:
        this.openWebstormApp();
        break;
      default:
        console.warn('Run using default application: ', app);
        this.openIntelliJApp();
    }
  },

  loadUserConfig() {
    this.configuration = Utils.getUserConfig();
  },

  openApplicationByIdeaFile(ideaFilename) {
    const appToOpen = Utils.calculateAppToOpenByIdeaFile(ideaFilename);
    this.openApplication(appToOpen);
  },

  openAppByProjectSources(projectFolder) {
    const appToOpen = Utils.calculateAppToOpenBySources(projectFolder);
    this.openApplication(appToOpen);
  },

  openIntelliJApp() {
    if (this.configuration.intellijApp) {
      execSync(this.configuration.intellijApp + ' .');
    } else {
      console.error(chalk.red('Not implemented yet'));
    }
  },

  openWebstormApp() {
    if (this.configuration.webstormApp) {
      execSync(this.configuration.webstormApp + ' .');
    } else {
      console.error(chalk.red('Not implemented yet'));
    }
  },

  openPHPStormApp() {
    console.error(chalk.red('Not implemented yet openPHPStormApp'));
  },

  openPyCharmApp() {
    console.error(chalk.red('Not implemented yet openPyCharmApp'));
  }
};
