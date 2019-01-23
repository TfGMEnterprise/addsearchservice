const redisClient = require('./src/utils/redis-client');

redisClient.set('grant', 'Grant is awesome', 10).then((result) => {
    redisClient.get('grant').then(value => {
        console.warn('value', value);
    });
});


