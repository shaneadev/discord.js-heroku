const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

const server_status = {
    total_users_ID: '585543386845544491',
    member_count_ID: '585543852820004864',
    bot_count_ID: '585543906746171403'
}

let cooldown = new Set();
let cdseconds = 180;

client.on('ready', () => {
    console.log('I am online!');
})

client.on('guildMemberAdd', member => {
    //var join_role = member.guild.find(role => role.name == 'Member');
    //member.addRole(join_role);
    
    let join_channel = client.channels.get('585482694918668290')
    join_channel.send(`Hey! ${member} s-a alaturat grupului. Salut ${member}, bine ai venit!`);

    const embed = new Discord.RichEmbed()
        .setAuthor(`Bine ai venit pe serverul SA-MP Forever, ${member.displayName}!`)
        .setDescription('**Iti uram sedere placuta alaturi de noi.\nDaca ai intrebari, ni le poti adresa pe chatul <#general>.\n\nO zi/seara/dimineata placuta :wink:!**')
        .setThumbnail('https://i.imgur.com/N20QRLC.jpg')
        .setColor('#3EB32D')
        .setTimestamp()
        .setFooter('joined', 'https://i.imgur.com/N20QRLC.jpg');
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
    if(msg.content.indexOf(config.prefix) !== 0) return;
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if(command === "ads") {
        if(!msg.member.permissions.has('ADMINISTRATOR')) return msg.reply("nu ai acces la aceasta comanda!");
        let message_channel = msg.mentions.channels.first();
        if(message_channel) {
            let embed = new Discord.RichEmbed()
            .setAuthor('Announcements:')
            .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/UyAUtrE')
            .setColor('#3EB32D')
            msg.delete();
            message_channel.send(embed);
        } else {
            let embed = new Discord.RichEmbed()
            .setAuthor('Announcements:')
            .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/UyAUtrE')
            .setColor('#3EB32D')
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
})

client.login(process.env.TOKEN);
