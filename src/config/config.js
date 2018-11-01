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
        baseUrl: 'https://api.addsearch.com/v1'
    }
});

module.exports = nconf;
