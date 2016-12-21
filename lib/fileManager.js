const fs = require('fs-extra');
let pwd = process.cwd();

/**
 * Manager for scaffolding files
 *
 * @type {{generateTemplates: Function, create: Function}}
 */
const FileManager = {
  generateTemplates: function (conf, vars) {
    let hasError,
      files = [],
      force = conf.forceRemove;

    if (conf.pwd) {
      pwd = conf.pwd;
    }

    conf.files.forEach(function (path) {
      let templateContent = fs.readFileSync(pwd + '/' + path, { encoding: 'utf8' }),
        fileConf,
        worked;

      Object.keys(vars).forEach(function (key) {
        templateContent = templateContent.replace(new RegExp('__' + key + '__', 'g'), vars[key]);
      });

      fileConf = JSON.parse(/\{.*\}/g.exec(templateContent)[0]);
      worked = FileManager.create(fileConf.path, templateContent.split('\n').splice(1).join('\n'), force);

      if (!worked && !force) {
        !hasError && console.log('');
        hasError = true;
        console.error(('Remove existing file: ' + fileConf.path + ' manually!').red);
      }

      files.push(fileConf.path);
    });

    if (hasError) {
      process.exit(1);
    }

    return files;
  },
  create: function (path, content, forceRemove) {
    path = (pwd + '/' + path).replace(/\/\//g, '/');
    let onlyPath = path.split('/').splice(0, path.split('/').length - 1).join('/');

    fs.ensureDirSync(onlyPath);

    if (fs.existsSync(path) && !forceRemove) {
      return false;
    }

    fs.writeFileSync(path, content, { encoding: 'utf8' });
    return true;
  }
};

module.exports = FileManager;
