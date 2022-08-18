import {Client, Intents} from 'discord.js';

class DiscordBot {
    
    constructor(config) {

        this.config = config;
        this.bot = new Client({

            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]

        });

        return;
    }

    async login() {

        await this.bot.login(this.config.platforms.discordBot.token).then(() => {

            console.log('\n\n(Discord Bot): Platform Status \x1b[93mEnabled\x1b[0m');

        }).catch((err) => {

            console.log('\n\n(Discord Bot) \x1b[91mERROR:\x1b[0m Platform Status \x1b[91mDisabled\x1b[0m | May something wrong with Bot Token in config');
            process.exit(1);

        });
        
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