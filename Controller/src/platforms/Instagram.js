import { saveFileData, getFileData } from '../utils/ServerData.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import instagram from 'instagram-web-api';
import FileCookieStore from 'tough-cookie-filestore2';
import FS from 'fs-extra';

class Instagram {
    constructor(server) {   

        this.config = server.config;
        this.database = server.database;
        
        return;
    }

    async run() {
        let cookiesDB = await this.database.getCookies();

        if(cookiesDB !== "") {

            await saveFileData(cookiesDB, "instagram/cookies/cookies.json", "JSON");

        }

        let username = this.config.platforms.instagram.username;
        let password = this.config.platforms.instagram.password;
        let cookieStore = new FileCookieStore('./server_data/instagram/cookies/cookies.json');

        this.client = new instagram({ username, password, cookieStore });

        await this.client.login({}, {_sharedData: false}).then(() => {

            console.log('\n\n(Instagram): Platform Status \x1b[93mEnabled\x1b[0m | Login as ' + username);

        }).catch((err) => {

            console.log('\n\n(Instagram) \x1b[91mERROR:\x1b[0m Platform Status \x1b[91mDisabled\x1b[0m | May something wrong with username or password in config');
            process.exit(1);

        });

        let fileCookiesNew = (await FS.readFile("./server_data/instagram/cookies/cookies.json")).toString();
        await this.database.igCookies.updateOne({index: 0}, {$set: {cookies: fileCookiesNew}});

        return;
    }

    async post(message, uuid) {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        let setCaption =  message;

        const photo = './server_data/instagram/image_temp/' + uuid + '.jpg';

        await this.client.uploadPhoto({ photo, caption: setCaption, post: 'feed' }).catch((err) => {
            
            console.log("\n\nSome Error when posting instagram, message uuid: " + uuid)

        });

        FS.rm('./server_data/instagram/image_temp/' + uuid + '.jpg');

        return;
    }
}

export default Instagram;