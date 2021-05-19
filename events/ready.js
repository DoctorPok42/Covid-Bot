const moment = require("moment");

module.exports = (client) => {
  console.log(`${client.user.tag} observe les ${client.guilds.cache.map((g) => g.memberCount).reduce((a, b) => a + b)} utilisateurs et ${client.guilds.cache.size} serveurs`);

  client.channels.cache.get("YOURCHANNELID").send(`Le bot est opérationnel ! (${client.guilds.cache.size})\nLe ${moment(client.online).format("LLL")}`);

    client.user.setPresence({
      activity: { name: client.config.ACTIVITY, type: client.config.TYPE },
      status: client.config.STATUS,
    });
};