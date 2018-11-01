var rp = require('request-promise');

const request = (uri, auth, method = 'GET', data, headers) => {

    const options = {
        method: method,
        uri: uri,
        json: true
    };

    if(data) {
        options.form = data;
    }

    if(headers) {
        options.headers = headers;
    }

    if(auth) {
        if(!auth.user)
        {
            return Promise.reject(new Error('auth object must contain `user` and `pass` properties'));
        }

        options.auth = {
            user: auth.user,
            pass: auth.pass
        }
    }

    return rp(options);
}

const get = (uri, auth, headers) => {
    return request(uri, auth, 'GET', null, headers);
}

const post = (uri, auth, data, headers) => {
    return request(uri, auth, 'POST', data, headers);
}

module.exports = {
    get: get,
    post: post
};