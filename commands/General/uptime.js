const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message) => {


  const duration = moment(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new MessageEmbed()
  .setTitle("⌛ Uptime ⌛")
  .setColor(client.info.color.yellow)
  .setDescription("\`\`\`fix\n"+duration+"\`\`\`")
  .setTimestamp()
  .setFooter(client.info.em.footer)
  message.channel.send(embed)

}

module.exports.help = {
  name: "uptime",
  aliases: ["uptime"],
  category: "general",
  description: "Renvoie le temps depuis que le bot a été lancé",
  usage: "",
  args: false,
}