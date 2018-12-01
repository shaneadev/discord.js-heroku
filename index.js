// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
let cooldown = new Set();
let cdseconds = 180;

client.on('ready', () => {
    client.user.setGame('justvillage.com', 'https://twitch.tv/justvillagecom/');
});

client.on("guildMemberAdd", async member => {
    var joinrole = member.guild.roles.find('name', 'Member');
    member.addRole(joinrole);
    let joinchannel = member.guild.channels.find(`name`, "general");
    if(!joinchannel) return;
    joinchannel.send(`**[+]** Alo veruti! **${member}** s-a alaturat acestui grup! Bun venit in familie **${member}**`);
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    
    if (command === 'sal') {
        if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("Trebuie sa astepti 3 minute pentru a folosi din nou comenzile!");
        }
        else msg.channel.send('Salutare!');
        
        cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)  
        }, cdseconds * 1000)
    }
    else if (command === 'pa') return msg.channel.send('Ce pa? Poate vrei sa te tau!');
    else if (command === 're') return msg.channel.send('Re băjatu!');
    else if (command === 'thespriteboss') return msg.channel.send('TheSprite e sheful tuturor!');
    else if (command === 'iarina') {
        msg.channel.send('shane: Langa tine uit de necazurile toate.. Tu imi dai putere sa merg mai departe.. tuu.. cu iubirea ta! @Iarina');
        msg.channel.send('https://www.youtube.com/watch?v=aGG52QNC678');
    }
    else if(command === 'profile') {
        let user = msg.mentions.users.first() || msg.author;
        let embed = new Discord.RichEmbed()
        .setAuthor(`Poza de profil a lui ${user.username} este:`)
        .setImage(user.displayAvatarURL)
        .setColor('RANDOM')
        msg.channel.send(embed)
    }
    else if(command === 'commands') {
        let embed = new Discord.RichEmbed()
        .setAuthor('Comenzile botului sunt:')
        .setDescription('!profile <@ user> - iti arata poza de profil a unui membru/sau poza ta\n!sal - Salutare de la bot\n!re - Re de la bot\n!pa - Amenintari de la bot')
        .setColor('RANDOM')
        msg.channel.send(embed)
    }
    else if(command === 'reclama') {
        if(!msg.member.permissions.has('ADMINISTRATOR')) return;
        let msgchannel = msg.guild.channels.find(`name`, "general");
        if(!msgchannel) return;
        let embed = new Discord.RichEmbed()
        .setAuthor('Announcements:')
        .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/Uj8qkYD')
        .setColor('RANDOM')
        msg.delete()
        return msgchannel.send(embed)
    }
});

client.on("channelCreate", async channel => {
    let sChannel =channel.guild.channels.find(`name`, "logs"); 
    sChannel.send(`Canalul ***${channel}*** a fost creat cu succes!`);
});
client.on("channelDelete", async channel => {
    let sChannel =channel.guild.channels.find(`name`, "logs"); 
    sChannel.send(`Canalul ***${channel}*** a fost sters, toate mesajele au fost stocate!`);
});
client.on("channelUpdate", async channel => {
    let sChannel =channel.guild.channels.find(`name`, "logs"); 
    sChannel.send(`Canalul ***${channel}*** a fost modificat de catre un administrator!`); 
});

client.login(process.env.TOKEN);
