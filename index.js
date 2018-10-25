// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
let cooldown = new Set();
let cdseconds = 60;

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
    
    if(cooldown.has(msg.author.id)) {
        msg.delete();
        return msg.reply("Trebuie sa astepti un minute pentru a folosi din noi comanda!");
    }
    cooldown.add(msg.author.id);   
    
    setTimeout(() => {
        cooldown.delete(msg.author.id)  
    }, cdseconds * 1000)
    
    if (command === 'sal') return msg.channel.send('Salutare!');
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
    else if(command === 'injura') {
        let user = msg.mentions.users.first() || msg.author;
        var facts = [`**${user.username}** du-te-n mă-ta pe gheață!`, `**${user.username}** bă, tu esti prost cu normă-ntreagă!`, `**${user.username}** ia loc in p!zda mă-tii de prost`, `Băi **${user.username}** asta. Zii lui mă-ta să nu îsi mai schimbe rujurile că îmi face pula curcubeu.`, `Bă **${user.username}**! Auzi ma pUlă bleagă o mai dor pe mata genunchii ?`, `**${user.username}**, nu ai vrea să te facem toți o rețea ??`];
        var fact = Math.floor(Math.random() * facts.length);
        msg.channel.send(facts[fact]);
    }
    else if(command === 'commands') {
        let embed = new Discord.RichEmbed()
        .setAuthor('Comenzile botului sunt:')
        .setDescription('!profile <@ user> - iti arata poza de profil a unui membru/sau poza ta.\n!sal - Salutare de la bot\n!re - Re de la bot\n!pa - Amenintari de la bot\n!injura <@ user> - Injura un membru!')
        .setColor('RANDOM')
        msg.channel.send(embed)
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
