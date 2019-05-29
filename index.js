// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

let cooldown = new Set();
let cdseconds = 180;

const serverStats = {
    guildID: '487210347644583946',
    totalUsersID: '487210345702621184',
    memberCountID: '487210346424172544',
    botCountID: '570627933337681939'
}

client.on('ready', () => {
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: 'San Andreas Universe',
            type: "STREAMING",
            url: "https://www.twitch.tv/mue"
        }
    });
});

client.on("guildMemberAdd", member => {
    var joinrole = member.guild.roles.find('name', 'Member')
    member.addRole(joinrole)

    const joinChannel = client.channels.get("575652735190302730")
    joinChannel.send(`**[+]** Alo verutzi! **${member}** s-a alaturat acestui grup! Bun venit in familie **${member}**`)

     if(member.guild.id !== serverStats.guildID) return;
			
    client.channels.get(serverStats.totalUsersID).setName(`total members: ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`human count: ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`bot count: ${member.guild.members.filter(m => m.user.bot).size}`);
});


client.on('message', msg => {
    if(msg.content == "clear chat") {
        if(msg.member.hasPermission("MANAGE_MESSAGES")) {
            msg.channel.fetchMessages()
               .then(function(list){
                msg.channel.bulkDelete(list);
	    }, function(err){msg.channel.send("Error: I can't clear this channel.")})                        
        }
    }

    const thisWord2 = "botule pls ameninta pe";
    if(msg.content.includes(thisWord2)) {
    	if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("trebuie sa astepti 3 minute pentru a folosi din nou aceasta comanda!");
        }

        number = 10;
	imageNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
	msg.channel.send( {files: ["./images/" + imageNumber + ".jpg"]});
	cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)
        }, cdseconds * 1000)
    }
	
    if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    
    if (command === 'serverinfo') {
	    msg.delete();
	    
	    function checkDays(date) {
		let now = new Date();
		let diff = now.getTime() - date.getTime();
		let days = Math.floor(diff / 86400000);
		return days + (days == 1 ? " day" : " days") + " ago";
	    };
	    function getCreationDate(id) { return new Date((id / 4194304) + 1420070400000); }
	    const embed = new Discord.RichEmbed()
		.setAuthor(msg.guild.name, msg.guild.iconURL)
		.addField("Owner:", `${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`, true)
		.addField("Members:", `${msg.guild.members.size} (online: ${msg.guild.members.filter(m => m.presence.status === 'online').size})`, true)
		.addField("Creation date:", `${getCreationDate("285793218023653376")}`, true)
		.setThumbnail(msg.guild.iconURL)
		.setColor('#3388d2')
	    msg.channel.send({embed});
    }
    else if (command === 'sal') {
        if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("trebuie sa astepti 3 minute pentru a folosi din nou aceasta comanda!");
        }
        msg.channel.send('Salutare!');
        
        cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)  
        }, cdseconds * 1000)
    }
    else if (command === 're') {
        if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("trebuie sa astepti 3 minute pentru a folosi din nou aceasta comanda!");
        }
        msg.channel.send('Re băjatu!');
        
        cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)  
        }, cdseconds * 1000)
    }
    else if (command === 'thespriteboss') {
        if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("trebuie sa astepti 3 minute pentru a folosi din nou aceasta comanda!");
        }
        msg.channel.send('TheSprite e sheful tuturor!');
        
        cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)  
        }, cdseconds * 1000)
    }
    else if(command === 'profile') {
        if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("trebuie sa astepti 3 minute pentru a folosi din nou aceasta comanda!");
        }
        let user = msg.mentions.users.first() || msg.author;
        let embed = new Discord.RichEmbed()
        .setAuthor(`Poza de profil a lui ${user.username} este:`)
        .setImage(user.displayAvatarURL)
        .setColor('#3388d2')
        msg.channel.send(embed)
        
        cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)  
        }, cdseconds * 1000)
    }
    else if(command === 'commands') {
        if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("trebuie sa astepti 3 minute pentru a folosi din nou aceasta comanda!");
        }
        let embed = new Discord.RichEmbed()
        .setAuthor('Comenzile botului sunt:')
        .setDescription('!profile <@ user> - iti arata poza de profil a unui membru/sau poza ta\n!sal - Salutare de la bot\n!re - Re de la bot\n!pa - Amenintari de la bot')
        .setColor('#3388d2')
        msg.channel.send(embed)
        
        cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)  
        }, cdseconds * 1000)
    }
    else if(command === 'reclama') {
        if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("trebuie sa astepti 3 minute pentru a folosi din nou aceasta comanda!");
        }
        if(!msg.member.permissions.has('ADMINISTRATOR')) return;
        let msgchannel = msg.guild.channels.find(`name`, "general");
        if(!msgchannel) return;
        let embed = new Discord.RichEmbed()
        .setAuthor('Announcements:')
        .setDescription('Sustine serverul de discord cu o distribuire a urmatorului link:\nInvite: https://discord.gg/Uj8qkYD')
        .setColor('#3388d2')
        msg.delete()
        msgchannel.send(embed)
        
        cooldown.add(msg.author.id);   

        setTimeout(() => {
            cooldown.delete(msg.author.id)  
        }, cdseconds * 1000)
    }
});

client.on("guildMemberRemove", member => {
    if(member.guild.id !== serverStats.guildID) return;
	
    client.channels.get(serverStats.totalUsersID).setName(`total members: ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`human count: ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`bot count: ${member.guild.members.filter(m => m.user.bot).size}`);
});

client.on("channelCreate", async channel => {
    let sChannel =channel.guild.channels.find(`name`, "logs"); 
    sChannel.send(`Canalul ***${channel}*** a fost creat cu succes!`);
});
client.on("channelDelete", async channel => {
    let sChannel =channel.guild.channels.find(`name`, "logs"); 
    sChannel.send(`Canalul ***${channel}*** a fost sters, toate mesajele au fost stocate!`);
});

client.login(process.env.TOKEN);
