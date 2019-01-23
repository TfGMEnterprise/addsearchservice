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
## Redis Cache

In order to take advantage of the redis cache locally. You must install and run redis.

install redis:
```brew install redis```

Configure redis to start on computer startup:
```ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents```