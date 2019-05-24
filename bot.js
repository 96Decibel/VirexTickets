const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`${client.user.tag} Ready !`);
  client.user.setGame(`$new  | VirexTickety ,🎫`,'https://www.twitch.tv/RATEbot');
});

client.on('message', message => {
    if (message.content === '$help') {
        let helpEmbed = new Discord.RichEmbed()
        .setTitle('**Ticket Commands**')
        .setDescription('**Prefix [`$`]**')
        .addField('$new', 'To Create A Ticket')
        .addField('$close', 'To Close Your Ticket')  
        .setFooter('Contact The Developer If You Want Help **RateED#1979**')
      message.channel.send(helpEmbed);
    }
});

client.on("message", (message) => {
   if (message.content.startsWith("$new")) {   
        const reason = message.content.split(" ").slice(1).join(" ");     
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`يجب انشاء رتبة بإٍسم : \`Support Team\` وتعطيها للبوت لكي يستطيع التعديل والانشاء `);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// Me Codes
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    /// by RateED#1979
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: | Done Make Your Ticket #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `Your Ticket Has Opend | Please Wait The Developers.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("$close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
       message.channel.send(`Tybe **$confirm** if You Sure`)
           .then((m) => {
               message.channel.awaitMessages(response => response.content === '$confirm', {
                       max: 1,
                       time: 10000,
                       errors: ['time'],
                   })    /// By RateED#1979
                   .then((collected) => {
                       message.channel.delete();
                   })    /// By RateED#1979
                   .catch(() => {
                       m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                           m2.delete();
                       }, 3000);
                   });
           });
   }
 
});

client.login(process.env.BOT_TOKEN);