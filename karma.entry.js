require('es6-shim');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('ts-helpers');
// Prevent Karma from running prematurely.
__karma__.loaded = function () { return; };
Promise.all([
    require('@angular/core/testing'),
    require('@angular/platform-browser-dynamic/testing')
])
    .then(function (a) {
        var testing = a[0];
        var testingBrowser = a[1];
        testing
            .getTestBed()
            .initTestEnvironment(
            testingBrowser.BrowserDynamicTestingModule,
            testingBrowser.platformBrowserDynamicTesting());
    })
    .then(function () { return require.context('./tests/', true, /\.ts/); })
    .then(function (context) { return context.keys().map(context); })
    .then(__karma__.start, __karma__.error);
