// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity('shane.mp4', {type: 'WATCHING'});
});

client.on('guildMemberAdd', (member) => {
    var joinrole = member.guild.roles.find('name', 'Member');
    member.addRole(joinrole);
    const joinchannel = member.guild.channels.find('name', 'general');
    if(!joinchannel) return;
    joinchannel.send('Avem un nou membru in familie!');
});

var anti_spam = require("discord-anti-spam");
 
antispam(bot, {
  warnBuffer: 3, //Maximum amount of messages allowed to send in the interval time before getting warned.
  maxBuffer: 5, // Maximum amount of messages allowed to send in the interval time before getting banned.
  interval: 1000, // Amount of time in ms users can send a maximum of the maxBuffer variable before getting banned.
  warningMessage: "stop spamming or I'll whack your head off.", // Warning message send to the user indicating they are going to fast.
  banMessage: "has been banned for spamming, anyone else?", // Ban message, always tags the banned user in front of it.
  maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned
  maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned
  deleteMessagesAfterBanForPastDays: 7 // Delete the spammed messages after banning for the past x days.
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'sal') return msg.channel.send('Salutare!');
    else if (command === 'pa') return msg.channel.send('Ce pa? Poate vrei sa te tau!');
    else if (command === 're') return msg.channel.send('Re băjatu!');
});

client.login(process.env.TOKEN);
