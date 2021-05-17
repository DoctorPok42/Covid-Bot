const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.config.prefix)) return;

  const args = message.content.slice(client.config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
    );
  if (!command) return;

  if (command.help.args && !args.length) {
    let argumenembed = new MessageEmbed()
      .setTitle("📜 Argument(s) 📜")
      .setColor("FF4242")
      .setDescription(
        `Il nous faut des arguments pour cette commande, ${message.author}`
      )
      .addField(
        `❯  Commande  :`,
        `\`${client.config.prefix}${command.help.name} ${command.help.usage}\``
      )
      .setFooter(message.author.username, message.author.displayAvatarURL())
      .setTimestamp();

    return message.channel.send(argumenembed);
  }

  command.run(client, message, args);
};
