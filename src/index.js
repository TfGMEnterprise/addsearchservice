const addSearch = require('./addsearch-client');

addSearch.search('tram').then((results) => {
    //console.warn(results);
});

addSearch.addToIndex('https://tfgm.com/forGM').then((results) => {
    console.warn(results);
});

