import DiscordBot from './platforms/DiscordBot.js';
import ImageManipulation from './utils/ImageManipulation.js';
import Database from './model/DatabaseHandler.js';
import Instagram from './platforms/Instagram.js';
import Twitter from './platforms/Twitter.js';
import { resourceLoader, saveFileData, getFileData } from './utils/ServerData.js'
import Sleep from './helper/Sleep.js';

import express from 'express';
import { v4 as uuidv4 } from 'uuid';

class Main {

    constructor() {
        
        this.main();
        this.server = {};
        
        return;
    }

    async main() {

        await resourceLoader();

        this.server.config = await getFileData('config.yml', 'YAML');
        this.server.database = new Database(this.server.config);

        this.api = express();
        this.instagram = new Instagram(this.server);
        this.twitter = new Twitter(this.server.config);

        this.discord = new DiscordBot(this.server.config);

        await this.server.database.connect();
        this.server.postTempData = await this.server.database.getTempHistoryMessage();
        this.postTempDataSync();

        await this.instagram.run();
        await this.discord.login();

        this.runAPI();
    }

    runAPI() {

        const api = this.api;

        api.use((req, res, next) => {
            
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);

            next();

            return;
        });

        api.use(express.json());

        api.use((err, req, res, next) => {
            
            if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

                return res.status(400).json({
                    statusCode: 400, 
                    resCode: 'middleware-error-1', 
                    message: err.message
                });
            }

            next();

            return;
        })
        
        api.post('/api/sendMessage', async (req, res) => {

            let messageTxt = req.body.text;
            let isInstagram = req.body.instagram;
            let isTwitter = req.body.twitter;
            let ipv4 = req.body.ipv4
            let deviceInfo = req.body.deviceInfo;
            let timestamp = new Date().getTime();
            let uuid = uuidv4();
            let ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
            if(typeof messageTxt !== 'string' || messageTxt.length < 6 || messageTxt.length > 270 || messageTxt[0] === ' ' || messageTxt[messageTxt.length - 1] === ' ') {
        
                res.status(405).json({
                    statusCode: 405, 
                    resCode: 'sendMessage-invalid-1', 
                    message: 'Text not valid'
                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: Text not valid');
        
                return;
            }

            messageTxt.replace(/\s\s+/g, ' ');

            let messageTxtSplt = messageTxt.split(' ');
            let char = messageTxt.split('');

            let accCharacters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890 ~!@#$%^&*()-_=+[]{}\\|;:\'",<.>/?';
            let accCharArr = accCharacters.split('');

            let isLengthValid = true;
            let isInvalidChar = false;

            let isMsgSpam = this.isPostTempDataExist(messageTxt);
        
            messageTxtSplt.forEach((val, idx, arr) => {
        
                if(val.length > 25) {
        
                    isLengthValid = false;
                    
                    return;
                }
        
            });

            char.forEach((val, idx, arr) => {

                let charFound = false;

                accCharArr.forEach((val2, idx2, arr2) => {

                    if(val === val2) {

                        charFound = true;

                    }

                });

                if(!charFound) {

                    isInvalidChar = true;

                    return;
                }

            });
        
            if(!isLengthValid) {
        
                res.status(405).json({
                    statusCode: 405, 
                    resCode: 'sendMessage-invalid-2', 
                    message: 'Text not valid, Maximum 25 char per words'
                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: Text not valid, Maximum 25 char per words');
                
                return;
            } else if (isInvalidChar) {

                res.status(405).json({

                    statusCode: 405, 
                    resCode: 'sendMessage-invalid-3', 
                    message: 'Invalid Character'

                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: Invalid character');

                return;
            }

            if(!isInstagram && !isTwitter) {

                res.status(405).json({
                    statusCode: 405,
                    resCode: 'sendMessage-invalid-4', 
                    message: 'No platforms found'
                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: No platform found');

                return;
            }

            if(typeof ipv4 !== 'string' || !ipv4.match(ipFormat)) {

                res.status(405).json({

                    statusCode: 405,
                    resCode: 'sendMessage-invalid-5',
                    message: 'IPv4 not valid'

                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: IPv4 not valid');
        
                return;
            }

            if(typeof deviceInfo !== 'string' || deviceInfo.length < 6) {
                
                res.status(405).json({

                    statusCode: 405,
                    resCode: 'sendMessage-invalid-6',
                    message: 'Device Info not valid'

                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: Device Info not valid');
        
                return;
            }

            if(isMsgSpam.instagram === true && isMsgSpam.twitter === true) {

                res.status(405).json({

                    statusCode: 405,
                    resCode: 'sendMessage-invalid-7-1',
                    message: 'This message is already post in Instagram and Twitter, please send another message'

                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: Message already post in Instagram and Twitter');
        
                return;

            } else if(isMsgSpam.instagram === true && isInstagram === true) {

                res.status(405).json({

                    statusCode: 405,
                    resCode: 'sendMessage-invalid-7-2',
                    message: 'This message is already post in Instagram, please send another message or you can post to Twitter only'

                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: Message already post in Instagram');
        
                return;
            } else if(isMsgSpam.twitter === true && isTwitter === true) {

                res.status(405).json({

                    statusCode: 405,
                    resCode: 'sendMessage-invalid-7-3',
                    message: 'This message is already post in Twitter, please send another message or you can post to Instagram only'

                });
                console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 405 Method Not Allowed\nDescription: Message already post in Twitter');
        
                return;
            }

            if(isInstagram) {

                await new ImageManipulation().save(messageTxt, uuid);
                await this.instagram.post(messageTxt, uuid);

            }

            if(isTwitter) {

                await this.twitter.post(messageTxt);

            }

            await this.addPostTempData(uuid, timestamp, messageTxt, isInstagram, isTwitter);
            await this.server.database.addHistoryMessage(uuid, timestamp, messageTxt, isInstagram, isTwitter, ipv4, deviceInfo);

            res.status(200).json({

                statusCode: 200, 
                resCode: 'sendMessage-OK', 
                message: 'OK'

            });
            console.log('\n\nEnd-Point: /api/sendMessage\nStatus: 200 OK\nDescription: Succesfully post a message');
        
            return;
        });
        
        api.post('/api/igPreview', async (req, res) => {
            
            let previewTxt = req.body.text;

            if(typeof previewTxt !== 'string' || previewTxt.length < 6 || previewTxt.length > 270 || previewTxt[0] === ' ') {
                
                res.status(405).json({
                    
                    statusCode: 405,
                    resCode: 'igPreview-invalid-1',
                    message: 'Text not valid'
                    
                });
                console.log('\n\nEnd-Point: /api/igPreview\nStatus: 405 Method Not Allowed\nDescription: Text not valid');
        
                return;
            }
            
            previewTxt.replace(/\s\s+/g, ' ');

            let previewTxtSplt = previewTxt.split(' ');
            let char = previewTxt.split('');

            let accCharacters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890 ~!@#$%^&*()-_=+[]{}\\|;:\'",<.>/?';
            let accCharArr = accCharacters.split('');

            let isLengthValid = true;
            let isInvalidChar = false;
        
            previewTxtSplt.forEach((val, idx, arr) => {
        
                if(val.length > 25) {
        
                    isLengthValid = false;
                    
                    return;
                }
        
            });

            char.forEach((val, idx, arr) => {

                let charFound = false;

                accCharArr.forEach((val2, idx2, arr2) => {

                    if(val === val2) {

                        charFound = true;

                    }

                });

                if(!charFound) {

                    isInvalidChar = true;

                    return;
                }

            });
        
            if(!isLengthValid) {
        
                res.status(405).json({

                    statusCode: 405, 
                    resCode: 'igPreview-invalid-2', 
                    message: 'Text not valid, Maximum 25 char per words'

                });
                console.log('\n\nEnd-Point: /api/igPreview\nStatus: 405 Method Not Allowed\nDescription: Text not valid, Maximum 25 char per words');
                
                return;
            } else if (isInvalidChar) {

                res.status(405).json({

                    statusCode: 405, 
                    resCode: 'igPreview-invalid-3', 
                    message: 'Invalid Character'

                });
                console.log('\n\nEnd-Point: /api/igPreview\nStatus: 405 Method Not Allowed\nDescription: Invalid character');

                return;
            }
        
            let image = await new ImageManipulation().preview(previewTxt);
            
            res.status(200).json({

                statusCode: 200, 
                resCode: 'igPreview-OK',
                message: 'OK',
                image: image

            });
        
            console.log('\n\nEnd-Point: /api/igPreview\nStatus: 200 OK\nDescription: Succesfully show preview');
        
            return;
        });
        
        api.post('/api/sendFeedback', async (req, res) => {
            
            let feedbackTxt = req.body.text;
            let ipv4 = req.body.ipv4;
            let deviceInfo = req.body.deviceInfo;
            let ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
            if(typeof feedbackTxt !== 'string' || feedbackTxt.length <= 5 || feedbackTxt.length > 314) {
        
                res.status(405).json({

                    statusCode: 405,
                    resCode: 'sendFeedback-invalid-1',
                    message: 'Text not valid'

                });
                console.log('\n\nEnd-Point: /api/sendFeedback\nStatus: 405 Method Not Allowed\nDescription: Text not valid');
        
                return;
            }

            if(typeof ipv4 !== 'string' || !ipv4.match(ipFormat)) {

                res.status(405).json({

                    statusCode: 405,
                    resCode: 'sendFeedback-invalid-2',
                    message: 'IPv4 not valid'

                });
                console.log('\n\nEnd-Point: /api/sendFeedback\nStatus: 405 Method Not Allowed\nDescription: IPv4 not valid');
        
                return;
            }

            if(typeof deviceInfo !== 'string' || deviceInfo.length < 6) {
                
                res.status(405).json({

                    statusCode: 405,
                    resCode: 'sendFeedback-invalid-3',
                    message: 'Device Info not valid'

                });
                console.log('\n\nEnd-Point: /api/sendFeedback\nStatus: 405 Method Not Allowed\nDescription: Device Info not valid');
        
                return;
            }
        
            this.discord.sendFeedback(feedbackTxt + '\n\n • IP: ' + ipv4 + '\n • Device: ' + deviceInfo);
        
            res.status(200).json({

                statusCode: 200, 
                resCode: 'sendFeedback-OK', 
                message: 'OK'

            });
            console.log('\n\nEnd-Point: /api/sendFeedback\nStatus: 200 OK\nDescription: Succesfully sent feedback');
            
            return;
        });
        
        api.listen(process.env.PORT || 3000);
        console.log("\n\n>>> Server Running <<<");

        return;
    }

    isPostTempDataExist(message) {
        
        let result = {

            instagram: false,
            twitter: false
            
        }

        this.server.postTempData.forEach((val) => {

            if(val.message === message && (this.server.postTempData[0].timestamp - new Date()) < 259200) {

                if(val.instagram === true) {

                    result.instagram = true;

                }

                if(val.twitter === true) {

                    result.twitter = true;

                }
            }

            if(result.instagram === true && result.twitter === true) return;
        });

        return result;
    }

    async addPostTempData(uuid, timestamp, msgTxt, instagram, twitter) {

        this.server.postTempData.push({

            uuid: uuid,
            timestamp: timestamp,
            message: msgTxt,
            instagram: instagram,
            twitter: twitter

        });

        return;
    }

    async postTempDataSync() {

        while(true) {

            if(this.server.postTempData[0] !== undefined) {
                
                if((this.server.postTempData[0].timestamp - new Date()) >= 259200) {

                    this.server.postTempData.shift();
                
                }
            }

            await this.server.database.tempHistoryMessage.updateOne({index: 0}, {$set: {data: JSON.stringify(this.server.postTempData)}});

            await Sleep.sleep(3);
        }

        return;
    }

}

new Main();
