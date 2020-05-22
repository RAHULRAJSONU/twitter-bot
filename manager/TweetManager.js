function TweetManager(twitterConnection){
    this.manager = twitterConnection;
    this.tweetCount = 0;
    this.retweetCount = 0;
};

TweetManager.prototype.tweet = function(){
    this.manager.post('statuses/update', {
        status: "Jai Shree Ram...."
    },
    (err,reply)=>{
        if(err !== undefined){
            console.log(err);
        }else{
            this.tweetCount++;
            console.log('Tweeted: '+reply.text);
        }
    });
};

TweetManager.prototype.retweet = function(user){
    let params = {
        from: user,
        count: 1000
    };
    this.manager.get('search/tweets', params, (err, data, response) => {
        let tweets = data.statuses;
        if (!err) {
            for (let dat of tweets) {
                // console.log(dat);
                let retweetId = dat.id_str;
                if(dat && dat.text){console.log('tweet length-> ',dat.text);}
                if(dat && dat.text && dat.text.length > 1000){
                    this.manager.post('statuses/retweet/:id', {
                        id: retweetId
                    }, (err, response) => {
                        if (response)
                            console.log('Retweeted!!! ' + retweetId);
                        if (err)
                            console.log('Something went wrong while RETWEETING... Duplication maybe...');
                    });
                }
            }
        }
    });
};

TweetManager.prototype.count = function(){
    console.log('Total tweeted: '+this.tweetCount+', Total retweeted: '+this.retweetCount);
};

module.exports = TweetManager;