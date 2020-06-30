const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

let cooldown = new Set();
let cdseconds = 180;

client.on('ready', () => {
    console.log('I am online now!');
    client.user.setActivity('shane!', { type: 'WATCHING' });
})

client.on('guildMemberAdd', member => {
    let join_channel = client.channels.get('694467466054729779')
    join_channel.send(`**[+]** Alo, lume! ${member} s-a alaturat acestui grup!`);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Bine ai venit pe discordul nostru, ${member.displayName}!`)
        .setDescription('**Te asteptam pe serverul de SA:MP al comunitatii!\nIP: rpg.optimgame.ro\n\nO zi/seara/dimineata placuta :wink:!**')
        .setThumbnail('https://cdn.discordapp.com/icons/604635561097166858/b424eaaba0afb8e9ff5662f7da002300.jpg')
        .setColor('#33632f')
        .setTimestamp()
        .setFooter('joined', 'https://cdn.discordapp.com/icons/604635561097166858/b424eaaba0afb8e9ff5662f7da002300.jpg');
    member.user.send(embed);
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
            .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/tMYy4fS')
            .setColor('#33632f')
            msg.delete();
            message_channel.send(embed);
        } else {
            let embed = new Discord.RichEmbed()
            .setAuthor('Announcements:')
            .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/tMYy4fS')
            .setColor('#33632f')
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
        .setDescription('Forumul comunitatii noastre este forum.optimgame.ro')
        .setColor('#33632f')
        msg.delete();
        msg.channel.send(embed);
    }
     else if(command === "panel") {
        let embed = new Discord.RichEmbed()
        .setAuthor('Panel:')
        .setDescription('Panelul comunitatii noastre este panel.optimgame.ro')
        .setColor('#33632f')
        msg.delete();
        msg.channel.send(embed);
    }
})

client.login(process.env.TOKEN);
