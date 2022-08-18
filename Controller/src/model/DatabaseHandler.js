import { MongoClient } from 'mongodb';

class Database{

    constructor(config) {

        this.client = new MongoClient(config.database.auth)
                
        return;
    }

    async connect() {
        
        await this.client.connect();

        this.db = this.client.db('usayit');

        this.igCookies = this.db.collection('instagram_cookies');
        this.historyMessage = this.db.collection('history_message');
        this.tempHistoryMessage = this.db.collection('temp_history_message');

        return;
    }

    async getCookies() {
        
        let cookies = (await this.igCookies.find({}, {projection: {index: 0}}).toArray())[0].cookies;

        return cookies;
    }

    async addHistoryMessage(uuid, timestamp, messageTxt, isInstagram, isTwitter, ipv4, deviceInfo) {
        
        let data = {

            uuid: uuid,
            timestamp: timestamp,
            ipv4: ipv4,
            deviceInfo: deviceInfo,
            message: messageTxt,
            instagram: isInstagram,
            twitter: isTwitter

        }

        await this.historyMessage.insertOne(data);

        return;
    }

    async getTempHistoryMessage() {
        
        let tempHistoryMessage = (await this.tempHistoryMessage.find({}, {projection: {index: 0}}).toArray())[0].data;
        let objTempHistoryMessage = await JSON.parse(tempHistoryMessage);

        return objTempHistoryMessage;

    }
}

export default Database;