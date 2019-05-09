// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

let cooldown = new Set();
let cdseconds = 180;

const serverStats = {
    guildID: '285793218023653376',
    totalUsersID: '487210345702621184',
    memberCountID: '487210346424172544',
    botCountID: '570627933337681939'
}

client.on('ready', () => {
    client.user.setGame('shane.exe');
});

client.on("guildMemberAdd", member => {
    var joinrole = member.guild.roles.find('name', 'Member');
    member.addRole(joinrole);
    let joinchannel = member.guild.channels.find(`name`, "general");
    if(!joinchannel) return;
    joinchannel.send(`**[+]** Alo veruti! **${member}** s-a alaturat acestui grup! Bun venit in familie **${member}**`);

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
	    function checkDays(date) {
		let now = new Date();
		let diff = now.getTime() - date.getTime();
		let days = Math.floor(diff / 86400000);
		return days + (days == 1 ? " day" : " days") + " ago";
	    };
	    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
	    let region = {
		"brazil": ":flag_br: Brazil",
		"eu-central": ":flag_eu: Central Europe",
		"singapore": ":flag_sg: Singapore",
		"us-central": ":flag_us: U.S. Central",
		"sydney": ":flag_au: Sydney",
		"us-east": ":flag_us: U.S. East",
		"us-south": ":flag_us: U.S. South",
		"us-west": ":flag_us: U.S. West",
		"eu-west": ":flag_eu: Western Europe",
		"vip-us-east": ":flag_us: VIP U.S. East",
		"london": ":flag_gb: London",
		"amsterdam": ":flag_nl: Amsterdam",
		"hongkong": ":flag_hk: Hong Kong",
		"russia": ":flag_ru: Russia",
		"southafrica": ":flag_za:  South Africa"
	    };
	    const embed = new Discord.RichEmbed()
		.setAuthor(msg.guild.name, msg.guild.iconURL)
		.addField("Name", msg.guild.name, true)
		.addField("ID", msg.guild.id, true)
		.addField("Owner", `${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`, true)
		.addField("Region", region[msg.guild.region], true)
		.addField("Total | Humans | Bots", `${msg.guild.members.size} | ${msg.guild.members.filter(member => !member.user.bot).size} | ${msg.guild.members.filter(member => member.user.bot).size}`, true)
		.addField("Verification Level", verifLevels[msg.guild.verificationLevel], true)
		.addField("Channels", msg.guild.channels.size, true)
		.addField("Roles", msg.guild.roles.size, true)
		.addField("Creation Date", `${msg.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, true)
		.setThumbnail(msg.guild.iconURL)
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
        .setColor('RANDOM')
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
        .setColor('RANDOM')
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
        .setColor('RANDOM')
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
