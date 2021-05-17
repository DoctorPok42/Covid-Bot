const { MessageEmbed } = require("discord.js");

module.exports.run = (message) => {
  var invite_embed = new MessageEmbed()
    .setTitle("📥 Invitez moi 📥")
    .setDescription(
      "**\n❯ Mon lien [Clique ici](https://discord.com/oauth2/authorize?client_id=843753698228436993&scope=bot&permissions=2146958847)"
    )
    .setFooter(client.info.footer)
  message.channel.send(invite_embed);
};

module.exports.help = {
  name: "invite",
  aliases: ["invite"],
  category: "general",
  description: "Renvoie l'invitation du bot",
  usage: "",
  args: false,
};