var path = require('path');
var fs = require('fs-extra');

var packageFolder = '../dist/';
var packagePath = path.join(__dirname, packageFolder, 'package.json');
var packageJson = require(packagePath);

const scriptsJson = {
    scripts: {
        "postinstall": "node postinstall.js"
    }
}
const newPackage = { ...packageJson, ...scriptsJson };

console.debug(newPackage);

console.debug('Writing package.json');

fs.outputJson(packagePath, newPackage, {
    spaces: 2
})
.then(function() { console.debug('Writing done'); })
.catch(function(err) { console.error(err); });


