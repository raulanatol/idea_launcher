const chalk = require('chalk');
const Utils = require("./utils");
const execSync = require("child_process").execSync;

function searchWebstorm() {
  if (Utils.fileExists('/usr/local/bin/webstorm')) {
    return '/usr/local/bin/webstorm';
  }
  return null;
}

function searchIntellij() {
  if (Utils.fileExists('/usr/local/bin/idea')) {
    return '/usr/local/bin/idea';
  }
  return null;
}

function searchPhpStorm() {
  if (Utils.fileExists('/usr/local/bin/pstorm')) {
    return '/usr/local/bin/pstorm';
  }
  return null;
}

function searchRubyMine() {
  if (Utils.fileExists('/usr/local/bin/mine')) {
    return '/usr/local/bin/mine';
  }
  return null;
}

function calculateDefaultConfig() {
  return {
    intellijApp: searchIntellij(),
    webstormApp: searchWebstorm(),
    phpstormApp: searchPhpStorm(),
    rubymineApp: searchRubyMine()
  };
}

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

  updateConfig() {
    Utils.refreshUserConfig(calculateDefaultConfig());
  },

  loadUserConfig() {
    this.configuration = Utils.getUserConfig(calculateDefaultConfig);
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
