const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs"),
  categoryList = readdirSync('./commands/');

module.exports.run = (client, message, args) => {
  if (!args.length) {
    const embed = new MessageEmbed()
    .setColor( client.info.color.none)
      .addField("Liste des commandes", `Préfix du bot : \`${client.config.prefix}\`\n help commande : \`${client.config.prefix}help <commande_name>\``)
      .setThumbnail(client.user.displayAvatarURL())

    for (const category of categoryList) {
      embed.addField(
        `${category}`,
        `\`${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(' | ')}\``
      );
    };
    return message.channel.send(embed);
  } else {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if (!command) return message.reply("cette commande n'existe pas!");

    const embed = new MessageEmbed()
      //.setAuthor(command.help.img, command.help.name)
      .setColor( client.info.color.none)
      .setDescription(command.help.size)
      .setTitle(`Aide de la comande \`${command.help.name}\``)
      .addField("Description", `${command.help.description}`, false)
      .addField(`Args :`, `\`${command.help.args ? "Argument requi" : "Pas d'argument requi"}\``, true)
      .addField(`Category`, `\`${command.help.category}\``, true)
      .addField("Utilisation", command.help.usage ? `${client.config.prefix}${command.help.name} ${command.help.usage}` : `${client.config.prefix}${command.help.name}`, true)
      if (command.help.aliases.length > 1) embed.addField("Alias", `\`${command.help.aliases.join(' | ')}\``, true);


    return message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  aliases: ["help", "h"],
  category: "general",
  description: "Renvoie une liste de commandes ou les informations sur une seule",
  usage: "[command_name]",
  args: false,
};
