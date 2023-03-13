const interactionCreate = require('./interactionCreate');
const messageCreate = require('./messageCreate');
const ready = require('./ready');

module.exports = {interactionCreate, messageCreate, ready};
module.exports = {
  name: 'guildMemberAdd',
  once: false,
  execute(member, Discord, client) {

    const welcomechannelId = '694200133977374801' //Channel You Want to Send The Welcome Message
    const targetChannelId = `1036867869356609606` //Channel For Rules

    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Umay');
    member.roles.add(welcomeRole);

    const channel = member.guild.channels.cache.get(welcomechannelId)

    const WelcomeEmbed = new Discord.MessageEmbed()
      .setTitle(`Welcome To ${member.guild.name}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setDescription(`Hello <@${member.user.id}>, Welcome to **${member.guild.name}**. Thanks For Joining Our Server.
Please Read ${member.guild.channels.cache.get(targetChannelId).toString()}, and assign yourself some roles at <#1036858064298582036>. You can chat in <#694200133977374804> and talk with other people.`)
      // You Can Add More Fields If You Want
      .setFooter(`Welcome ${member.user.username}#${member.user.discriminator}`, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor('RANDOM')
    member.guild.channels.cache.get(welcomechannelId).send(WelcomeEmbed)

  }
}
