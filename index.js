// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setGame('justvillage.com', 'https://www.youtube.com/channel/UCI9sFzv0XHooQXWfsk3bFSw');
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
    if (command === 'sal') return msg.channel.send('Salutare!');
    else if (command === 'pa') return msg.channel.send('Ce pa? Poate vrei sa te tau!');
    else if (command === 're') return msg.channel.send('Re băjatu!');
    else if (command === 'thespriteboss') return msg.channel.send('TheSprite e sheful tuturor!');
    else if (command === 'iarina') {
        msg.channel.send('shane: Langa tine uit de necazurile toate.. Tu imi dai putere sa merg mai departe.. tuu.. cu iubirea ta! @Iarina');
        msg.channel.send('https://www.youtube.com/watch?v=aGG52QNC678');
    }
});

client.login(process.env.TOKEN);
