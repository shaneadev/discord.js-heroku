// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity('shane.exe', {type: 'WATCHING'});
});

client.on('guildMemberAdd', (member) => {
    var joinrole = member.guild.roles.find('name', 'Member');
    member.addRole(joinrole);
    const joinchannel = member.guild.channels.find('name', 'general');
    if(!joinchannel) return;
    joinchannel.send('**${member.user.username}** a intrat in familie. Bine ai venit, **${member.user.username}**!');
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'sal') return msg.channel.send('Salutare!');
    else if (command === 'pa') return msg.channel.send('Ce pa? Poate vrei sa te tau!');
});

client.login(process.env.TOKEN);
