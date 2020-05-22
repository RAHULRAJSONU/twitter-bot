var Twit = require('twit');
var Manager = require('./manager/TweetManager');
var asyncForEach = require('./utils/asyncUtils');
var conf = require('./security/conf');

var retweetUserList = [];


var T = new Twit(conf);

T.get('account/verify_credentials', {
    include_entities: false,
    skip_status: true,
    include_email: false
}, onAuthenticated);

function onAuthenticated(err, res) {
    if (err) {
        throw err;
    }
    console.log('Authentication successfull. Running boot....\r\n');

    var stream = T.stream('statuses/filter', { track: '@Rahulraj_sonu' });
    manager = new Manager(T);
    // manager.tweet();
    // asyncForEach(retweetUserList, (user) =>manager.retweet(user));
    manager.retweet('@SudhanshuTrived')
    stream.on('follow', onFollowed);
    stream.on('error', onError);
}

function onFollowed(event) {
    var name = event.source.name;
    var screenName = event.source.screen_name;
    var response = '@' + screenName + ' Thank you for following, ' + name + '!';
    console.log('I was followd by: ' + name + ' @' + screenName);
}

function onError(error) {
    throw error;
}