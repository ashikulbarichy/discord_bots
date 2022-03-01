require('dotenv').config();

const lib = require('lib');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const VOICE_CHANNEL = '722771695848652850';
const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on('ready', () =>{
    console.log(`${client.user.tag}`);
});

client.on('message', async(message) => {
    //console.log(`${message.author.tag}: ${message.content}`);
    if(message.content === 'hello' || message.content === 'hi'){
       message.channel.send(`hello there! ${message.author.username}`);
    }
    if(message.content === 'fuck you'){
        message.channel.send(`You can fuck yourself! ${message.author.username}`);
     }
     if(message.content.startsWith('!play')){
        let searchString = message.content.split(' ').slice(1).join(' ');
    
        try{
            let youtubeLink;
            if(!searchString){
                return lib.discord.channels['@0.2.0'].messages.create({
                    channel_id: `${context.params.event.channel_id}`,
                    content: `No search string provided!`,
                });
            }
            if(!searchString.includes('youtube.com')){
                let results = await ytSearch(searchString);
                if(!results?.all?.length){
                    return lib.discord.channels['@0.2.0'].messages.create({
                        channel_id: `${context.params.event.channel_id}`,
                        content: `No results found for your search string. Please try a different one!`,
                    });
                }
                youtubeLink = results.all[0].url;
            }else{
                youtubeLink = searchString;
            }
            let downloadInfo = await ytdl.getInfo(youtubeLink);
            await lib.discord.voice['@0.0.1'].tracks.play({
                channel_id: `${VOICE_CHANNEL}`,
                guild_id: `${context.params.event.guild_id}`,
                download_info: downloadInfo
            });
            return lib.discord.voice['@0.2.0'].messages.create({
                channel_id: `${context.params.event.channel_id}`,
                content: `Now playing **${downloadInfo.videoDetails.title}**`,
            });
        }catch(e){
            return lib.discord.channels['@0.2.0'].messages.create({
                channel_id: `${context.params.event.channel_id}`,
                content: `Failed tp play track`,
            });
        }
    }
});


client.login(process.env.DISCORDJS_BOT_TOKEN);

