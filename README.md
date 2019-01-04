# AddSearchService
This is a JS library written to access the AddSearch [Search API](https://www.addsearch.com/support/api-reference/)

## Installation

Install the AddSearchService via npm using:

```npm install https://github.com/TfGMEnterprise/addsearchservice.git```

## Usage

```javascript
const publicApiKey = 'YOURAPIKEY'
const addSearchClient = require('AddSearchClient')(publicApiKey);

addSearchClient.search('foo').then((results) => {
  results.forEach((result) => {
    // handle each results here
  });
});

```