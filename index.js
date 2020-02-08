const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

const server_status = {
    total_users_ID: '487210345702621184',
    member_count_ID: '487210346424172544',
    bot_count_ID: '570627933337681939'
}

let cooldown = new Set();
let cdseconds = 180;

client.on('ready', () => {
    console.log('I am online now!');
    client.user.setActivity('shane!', { type: 'WATCHING' });
})

client.on('guildMemberAdd', member => {
    let join_channel = client.channels.get('508727729256923137')
    join_channel.send(`**[+]** Alo verutziii! ${member} s-a alaturat acestui grup!`);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Bine ai venit pe serverul nostru, ${member.displayName}!`)
        .setDescription('**Iti uram sedere placuta alaturi de noi.\nDaca ai intrebari, ni le poti adresa pe chatul <#general>.\n\nO zi/seara/dimineata placuta :wink:!**')
        .setThumbnail('https://cdn.discordapp.com/icons/508722185599189002/ea451e9042ed31db369a10e4f010f291.jpg')
        .setColor('#070707')
        .setTimestamp()
        .setFooter('joined', 'https://cdn.discordapp.com/icons/508722185599189002/ea451e9042ed31db369a10e4f010f291.jpg');
    member.user.send(embed);

    //server status
    let users_channel = client.channels.get(server_status.total_users_ID)
    users_channel.setName(`total members: ${member.guild.memberCount}`);
    let human_channel = client.channels.get(server_status.member_count_ID)
    human_channel.setName(`human count: ${member.guild.members.filter(m => !m.user.bot).size}`);
    let bot_channel = client.channels.get(server_status.bot_count_ID)
    bot_channel.setName(`bot count: ${member.guild.members.filter(m => m.user.bot).size}`);
})

client.on('guildMemberRemove', member => {
    //server status
    let users_channel = client.channels.get(server_status.total_users_ID)
    users_channel.setName(`total members: ${member.guild.memberCount}`);
    let human_channel = client.channels.get(server_status.member_count_ID)
    human_channel.setName(`human count: ${member.guild.members.filter(m => !m.user.bot).size}`);
    let bot_channel = client.channels.get(server_status.bot_count_ID)
    bot_channel.setName(`bot count: ${member.guild.members.filter(m => m.user.bot).size}`);
})

client.on('message', msg => {
    if(msg.content === "Salut") {
        if(cooldown.has(msg.author.id)) return;
        msg.channel.send('Salutare!');
        
        cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)  
        }, cdseconds * 1000)
    }
  
    if(msg.content.indexOf(config.prefix) !== 0) return;
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if(command === "ads") {
        if(!msg.member.permissions.has('ADMINISTRATOR')) return msg.reply("nu ai acces la aceasta comanda!");
        let message_channel = msg.mentions.channels.first();
        if(message_channel) {
            let embed = new Discord.RichEmbed()
            .setAuthor('Announcements:')
            .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/s9gSsNa')
            .setColor('#070707')
            msg.delete();
            message_channel.send(embed);
        } else {
            let embed = new Discord.RichEmbed()
            .setAuthor('Announcements:')
            .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/s9gSsNa')
            .setColor('#070707')
            msg.delete();
            msg.channel.send(embed);
        }
    }
    else if(command === "cc") {
        if(msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.channel.fetchMessages()
               .then(function(list) {
                    msg.channel.bulkDelete(list);
                    msg.reply("chat cleared!");
            }, function(err){msg.channel.send("Eroare: Nu pot sterge mesajele acestui canal.")})                        
        } else { msg.reply("nu ai acces la aceasta comanda!"); }
    }
    else if(command === "forum") {
        let embed = new Discord.RichEmbed()
        .setAuthor('Forum:')
        .setDescription('Forumul comunitatii noastre este w-moon.ro/forum')
        .setColor('#385C7C')
        msg.delete();
        msg.channel.send(embed);
    }
     else if(command === "panel") {
        let embed = new Discord.RichEmbed()
        .setAuthor('Panel:')
        .setDescription('Panelul comunitatii noastre este panel.w-moon.ro')
        .setColor('#385C7C')
        msg.delete();
        msg.channel.send(embed);
    }
})

client.login(process.env.TOKEN);
