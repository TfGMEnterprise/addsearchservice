const httpClient = require('./utils/http-client');
const config = require('./config')

const publicKey = config.get('addsearch:siteKey');
const privateKey = config.get('addsearch:privateKey');
const baseUrl = config.get('addsearch:baseUrl');

const serialize = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
};

const search = (term, limit = 50, page = 1, fuzzy = false) => {
    const cleanTerm = term.replace(/[\W_]+/g," ");
    const plusSpaces = cleanTerm.replace(' ', '+');

    const params = {
        term: term,
        limit: limit,
        page: page,
        fuzzy: fuzzy
    }

    const searchUri = `${baseUrl}/search/${publicKey}?${serialize(params)}`;
    
    return httpClient.get(searchUri);
}

const addToIndex = (url) => {
    const params = {
        action: 'FETCH',
        indexPublicKey: publicKey,
        url: url
    };

    const crawlerUrl = `${baseUrl}/crawler`;

    return httpClient.post(crawlerUrl, { user: publicKey, pass:privateKey }, params);
}

module.exports = {
    search: search,
    addToIndex: addToIndex
};