// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity('shane & iarina.mp4', {type: 'WATCHING'});
});

client.on('guildMemberAdd', (member) => {
    var joinrole = member.guild.roles.find('name', 'Member');
    member.addRole(joinrole);
    const joinchannel = member.guild.channels.find('name', 'general');
    if(!joinchannel) return;
    joinchannel.send('Avem un nou membru in familie!');
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'sal') return msg.channel.send('Salutare!');
    else if (command === 'pa') return msg.channel.send('Ce pa? Poate vrei sa te tau!');
    else if (command === 're') return msg.channel.send('Re băjatu!');
    else if (command === 'thespriteboss') return msg.channel.send('TheSprite e sheful tuturor!');
    else if (command === 'iarina') return msg.channel.send('shane: Langa tine uit de necazurile toate.. Tu imi dai putere sa merg mai departe.. tuu.. cu iubirea ta! @Iarina');
});

client.login(process.env.TOKEN);
