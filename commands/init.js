const fs = require('fs-extra'),
    mkdirp = require('mkdirp'),
    pwd = process.cwd(),
    path = require('path'),
    colors = require('colors');

module.exports = function (opts) {
    let newSettings,
        res = path.resolve,
        cliSettings = {
            "profile": "default",
            "config": "private/orion-config.json"
        };

    if (!fs.existsSync(pwd + '/.meteor')) {
        console.error("Run 'init' within your Meteor App!".red);
        process.exit(1);
    }

    if (!fs.existsSync(pwd + '/settings.json')) {
        newSettings = {
            'orion-cli': cliSettings
        };
    } else {
        newSettings = JSON.parse(fs.readFileSync((pwd + '/settings.json'), {encoding: 'utf8'}));
        newSettings['orion-cli'] = cliSettings;
        fs.unlinkSync(pwd + '/settings.json');
    }

    fs.writeFileSync(pwd + '/settings.json', JSON.stringify(newSettings, null, 4) + '\n');
    console.log('    Initialized settings.json with orion default configuration');

    fs.ensureDirSync(pwd + '/private/templates');
    fs.copySync(res(__dirname, '../init/orion-config.json'), pwd + '/private/orion-config.json');
    fs.copySync(res(__dirname, '../init/templates'), pwd + '/private/templates');
    console.log('    Initialized orion-config.json and scaffolding templates under private/');
};