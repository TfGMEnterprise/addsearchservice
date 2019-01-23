const redis = require('redis');
const oneHourInSeconds = 60 * 60;

const getClient = (host = null, port = null) => {
    return new Promise((resolve, reject) => {
        const client = redis.createClient(port, host, {});
        client.on('connect', function () {
            resolve(client);
        });
        client.on('error', function (err) {
            console.log('Something went wrong ' + err);
            reject(err);
        });
    });
};

const get = (key) => {
    return new Promise((resolve, reject) => {
        getClient().then((client) => {
            client.get(key, function (error, result) {
                if (error) {
                    reject(error);
                    throw error;
                }
                resolve(result);
            });
        }).catch((err) => {
            console.warn(err);
        });
    });
};

const set = (key, value, expirySeconds = oneHourInSeconds) => {
    return new Promise((resolve, reject) => {
        getClient().then((client) => {
            client.set(key, value, 'EX', expirySeconds, (error, result) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                console.log('value saved')
                resolve(result);
            });
        }).catch((err) => {
            console.warn(err);
        });
    });
};

const getset = (key, valuePromise) => {
    return get(key).then((value) => {
        if (value == null) {
            try {
                value = JSON.stringify(value);
            } catch(ex) { }
            
            return valuePromise().then(async (value) => {
                await set(key, value);
                return value;
            });
        }
        try {
            return JSON.parse(value);
        } catch(ex) {
            return value;
        }
    });
};

module.exports = {
    get: get,
    set: set,
    getset: getset
};