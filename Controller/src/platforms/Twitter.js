import { TwitterApi } from'twitter-api-v2';

class Twitter {

    constructor() {

        this.client = new TwitterApi({
            appKey: '',
            appSecret: '',
            accessToken: '',
            accessSecret: ''
        });

        this.rwClient = this.client.readWrite;
        this.rwClient.v2.me().then(() => {

            console.log('(Twitter): Platform Status \x1b[93mEnabled\x1b[0m');

        }).catch((err) => {

            console.log('(Twitter) \x1b[91mERROR:\x1b[0m Platform Status \x1b[91mDisabled\x1b[0m | May something wrong with API Key in config');

        });

        return;
    }

    async post(message) {
        let tweetMsg = "💭┇ " + message;

        await this.rwClient.v2.tweet({ text: tweetMsg, });

        return;
    }

};

export default Twitter;