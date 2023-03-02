const logger = require("../logger");
const {countingChannel} = require('../config');
const Discord = require("discord.js");
let count = 0;
let lastUser = null;

module.exports = async (e) => {
  logger.info(`MessageCreate interaction for user [discordSnowflake=${e.author.id}]`);

  if (e.author.bot === true) return;

  if (e.channel.id === countingChannel) {
    if (Number(e.content) === count + 1 && lastUser !== e.author.id) {
      count++;
      lastUser = e.author.id;
      await e.react("✅");
    } else {
      await e.react("❌");
      if (Number(e.content) !== count + 1) {
        const embed = new Discord.EmbedBuilder()
          .setColor("#ff0000")
          .setTitle("Miscounted!")
          .setDescription(
            `<@${e.author.id}>, you miscounted. Next number was ${count +
              1}. Restarting from 0.`
          )
          .setThumbnail("https://media.tenor.com/VzjRFZU38sgAAAAC/sad-frog.gif");
        if (embed) {
          await e.channel.send({ embeds: [embed] });
          count = 0;
          lastUser = null;
        }
      } else if (lastUser === e.author.id) {
        const embed = new Discord.EmbedBuilder()
          .setColor("#ff0000")
          .setTitle("Same person tried to send next number")
          .setDescription(
            `<@${e.author.id}>, chala jaa warna banana aake gaand mar dega.`
          )
          .setThumbnail("https://wallpapers.com/images/high/banana-with-gun-greenscreen-background-d93mkt441aenm3ym.webp");
        if (embed) {
          await e.channel.send({ embeds: [embed] });
        }
      }
    }
  }
};
