import {Client, Intents} from 'discord.js';

class DiscordBot {
    
    constructor() {

        this.bot = new Client({

            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]

        });

        return;
    }

    async login() {

        await this.bot.login("OTk0OTcxNDQyNDQzNzE4Njk2.GTBH2Y.cN_mzyHBp0ySwbBjfARW1EAss-eznI89MJVzwk");
        
        return;
    }

    sendFeedback(text) {

        this.bot.channels.cache.get("994969568617451601").send({
            content: "\u200B",
            embeds: [{
                color: "0xFFEB3C",
                title: "New Feedback",
                description: text,
                footer: {
                    text: "© uSay!t | All rights reserved",
                }
            }]
        });
        
        return;
    }

}

export default DiscordBot;