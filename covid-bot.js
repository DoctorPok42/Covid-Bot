const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader");

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.config = require("./config");
["commands", " s"].forEach((x) => (client[x] = new Collection()));
client.info = require("./assets/info.json");

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN);

