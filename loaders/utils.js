const fs = require('fs');
const path = require("path");
const os = require("os");
const readDir = require('readdir');

function initUserConfig(folder, filepath) {
  const initialConfig = {
    intellijApp: 'intellij',
    webstormApp: 'webstorm'
  };
  fs.mkdirSync(folder);
  fs.writeFileSync(filepath, JSON.stringify(initialConfig), 'utf-8');
}

module.exports = {
  APPS: {
    INTELLIJ: 0,
    PHP_STORM: 1,
    WEBSTORM: 2,
    PY_CHARM: 3,
  },

  getUserConfig() {
    const folder = path.join(os.homedir(), '.idea_launcher');
    const configFile = path.join(folder, 'config.json');
    if (!fs.existsSync(configFile)) {
      return initUserConfig(folder, configFile);
    } else {
      return JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    }
  },

  getImlFile(ideaFilename) {
    const files = readDir.readSync(ideaFilename, ['**.iml']);
    if (files.length > 0) {
      return path.join(ideaFilename, files[0]);
    }
    return null;
  },

  calculateAppToOpenBySources(projectFolder) {
    if (fs.existsSync(path.join(projectFolder, 'pom.xml'))) {
      return this.APPS.INTELLIJ;
    }

    if (fs.existsSync(path.join(projectFolder, 'Gemfile'))) {
      return this.APPS.RUBY_MINE;
    }

    if (fs.existsSync(path.join(projectFolder, 'app', 'src', 'main', 'AndroidManifest.xml'))) {
      return this.APPS.ANDROID_STUDIO;
    }

    if (fs.existsSync(path.join(projectFolder, 'settings.gradle'))) {
      return this.APPS.ANDROID_STUDIO;
    }

    if (fs.existsSync(path.join(projectFolder, 'package.json'))) {
      return this.APPS.WEBSTORM;
    }

    if (fs.existsSync(path.join(projectFolder, 'requirements.txt'))) {
      return this.APPS.PY_CHARM;
    }

    if (fs.existsSync(path.join(projectFolder, 'wp-login.php'))) {
      return this.APPS.PHP_STORM;
    }

    if (fs.existsSync(path.join(projectFolder, 'composer.json'))) {
      return this.APPS.PHP_STORM;
    }

    if (fs.existsSync(path.join(projectFolder, 'index.php'))) {
      return this.APPS.PHP_STORM;
    }

    console.warn('Run using default application - Using sources');
    return this.APPS.INTELLIJ;
  },

  calculateAppToOpenByIdeaFile(ideaFilename) {
    const imlFilename = this.getImlFile(ideaFilename);
    if (imlFilename) {
      const imlData = fs.readFileSync(imlFilename, 'utf-8');
      if (imlData.indexOf('JAVA_MODULE') >= 0) {
        return this.APPS.INTELLIJ;
      }

      if (imlData.indexOf('PHP Runtime') >= 0) {
        return this.APPS.PHP_STORM;
      }

      if (imlData.indexOf('WEB_MODULE') >= 0) {
        return this.APPS.WEBSTORM;
      }

      if (imlData.indexOf('PYTHON_MODULE') >= 0) {
        return this.APPS.PY_CHARM;
      }
    }

    console.warn('Run using default application: ', imlFilename);
    return this.APPS.INTELLIJ;
  }
};
