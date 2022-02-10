require('dotenv').config();

const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () =>{
    console.log(`${client.user.tag}`);
});

client.on('message', (message) => {
    //console.log(`${message.author.tag}: ${message.content}`);
    if(message.content === 'hello'){
        message.channel.send(`hello there! @${message.author.username}`);
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);
