// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();

let cooldown = new Set();
let cdseconds = 180;

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
	
    let joinchannel = member.guild.channels.find('name', 'secrets');
    joinchannel.send(`**[+]** Alo verutzii! ${member} s-a alaturat acestui grup!`)
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
    
    if (command === 'sal') {
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
    else if(command === 'reclama') {
        if(cooldown.has(msg.author.id)) {
            msg.delete();
            return msg.reply("trebuie sa astepti 3 minute pentru a folosi din nou aceasta comanda!");
        }
        if(!msg.member.permissions.has('ADMINISTRATOR')) return;
        let msgchannel = msg.guild.channels.find('name', 'general');
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

client.on("channelCreate", async channel => {
    let sChannel =channel.guild.channels.find(`name`, "logs"); 
    sChannel.send(`Canalul ***${channel}*** a fost creat cu succes!`);
});
client.on("channelDelete", async channel => {
    let sChannel =channel.guild.channels.find(`name`, "logs"); 
    sChannel.send(`Canalul ***${channel}*** a fost sters, toate mesajele au fost stocate!`);
});

client.login(process.env.TOKEN);
