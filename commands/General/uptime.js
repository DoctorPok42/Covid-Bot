const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message) => {


  const duration = moment(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const d = '```fix\n' + duration + '```'
  const embed = new MessageEmbed()
  .setTitle("⌛ Uptime ⌛")
  .setColor(client.info.yellow)
  .setDescription(d)
  .setTimestamp()
  .setFooter(client.info.footer)
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