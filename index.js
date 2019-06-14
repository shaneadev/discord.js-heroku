const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

let cooldown = new Set();
let cdseconds = 180;

client.on('ready', () => {
    console.log('I am online!');
    client.user.setActivity('north.w-moon.ro', { type: 'WATCHING' });
})

client.on('guildMemberAdd', member => {
    //var join_role = member.guild.find(role => role.name == 'Member');
    //member.addRole(join_role);
    
    let join_channel = client.channels.get('571034615699996701')
    join_channel.send(`Hey! ${member} s-a alaturat grupului. Salut ${member}, bine ai venit! :tada: `);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Bine ai venit pe serverul W-Moon, ${member.displayName}!`)
        .setDescription('**Iti uram sedere placuta alaturi de noi.\nNu uita sa ai un limbaj ok pe chatul <#general>.\n\nO zi/seara/dimineata placuta :wink:!**')
        .setThumbnail('https://i.imgur.com/k7yuSxz.png')
        .setColor('#385C7C')
        .setTimestamp()
        .setFooter('joined', 'https://i.imgur.com/k7yuSxz.png');
    member.user.send(embed);
})

client.on('message', msg => {
    if(msg.content.indexOf(config.prefix) !== 0) return;
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if(command === "ads") {
        if(!msg.member.permissions.has('ADMINISTRATOR')) return msg.reply("nu ai acces la aceasta comanda!");
        let message_channel = msg.mentions.channels.first();
        if(message_channel) {
            let embed = new Discord.RichEmbed()
            .setAuthor('Announcements:')
            .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/ak7DPKu')
            .setColor('#385C7C')
            msg.delete();
            message_channel.send(embed);
        } else {
            let embed = new Discord.RichEmbed()
            .setAuthor('Announcements:')
            .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/ak7DPKu')
            .setColor('#385C7C')
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
