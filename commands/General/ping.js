 
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message) => {
  const msg = await message.channel.send("Ping Ping Ping ...");

  const me = new MessageEmbed()
    .setTitle("Pong !")
    .addField(
      "Latence du bot :",
      msg.createdTimestamp - message.createdTimestamp + " ms",
      true
    )
    .addField("Latence de l'API :", Math.round(client.ws.ping) + " ms", true)
    .setColor(client.info.purple)
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()
    .setFooter(client.info.footer)

  message.channel.send(me);
  msg.delete();
};

module.exports.help = {
  name: "ping",
  aliases: ["ping"],
  category: "general",
  description: "Renvoie la latence du bot",
  usage: "",
  args: false,
};
