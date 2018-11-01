const { serialize } = require("./utils/serialize");
const httpClient = require('./utils/http-client');
const config = require('./config/config')

let publicKey = null;
const baseUrl = config.get('addsearch:baseUrl');

/**
 * @typedef {Object} SearchResult - A single AddSearch result
 * @property {string} id - The search result identifier
 * @property {string} url - the URL of the result
 * @property {string} title - the title of the result
 * * @property {string} meta_description - meta description from the result page
 * * @property {Array<Object>} meta_categories - meta categories from the result page
 * * @property {Array<Object>} custom_fields - custom fields for the result as defined with AddSearch
 * * @property {string} highlight - an excerpt of the result page
 * * @property {Date} ts - the date the page was last indexed
 * * @property {Array<Object>} categories - The AddSearch categories for this result page.
 * * @property {Object} images - An object containing images from the result page.
 * * @property {number} score - A score representing relevence to the search term.
  */

// Parameters may be declared in a variety of syntactic forms
/**
 * @param {string}  term - The keyword(s) to be used for the search
 * @param {number} limit - The number of results to show (1-50)
 * @param {string} page - The page of results to show
 * @param {string} fuzzy - Enable fuzzy search
 * @return {Array<SearchResult>} On object containing search() and addToIndex() functions
 */
function search(term, limit = 50, page = 1, fuzzy = false) {
    const cleanTerm = term.replace(/[\W_]+/g, " ");
    const plusSpaces = cleanTerm.replace(' ', '+');

    const params = {
        term: plusSpaces,
        limit: limit,
        page: page,
        fuzzy: fuzzy
    }

    const searchUri = `${baseUrl}/search/${publicKey}?${serialize(params)}`;

    return httpClient.get(searchUri);
}

// Parameters may be declared in a variety of syntactic forms
/**
 * @param {string}  publicApiKey - The AddSearch publicAPIKey
 * @return {Object} On object containing the search() function
 */
function init(publicApiKey) {
    publicKey = publicApiKey;

    return {
        search: search
    }
};

module.exports = init;