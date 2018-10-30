"use strict";

const nconf = require('nconf');


// application configuration

// 1. Configuration values provided on the command line
nconf.argv({
    parseValues: true
});

// 2. Configuration values provided by environment variables
nconf.env({
    parseValues: true,
    separator: '__'
});

// 3. Default configuration values
nconf.defaults({
    addsearch: {
        baseUrl: 'https://api.addsearch.com/v1',
        siteKey: 'cb7b6cce11bd2d81475a80f6cb62d38a',
        privateKey: '9bcde628f7443d79962b06a526f86561'
    }
});

module.exports = nconf;
