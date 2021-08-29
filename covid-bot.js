const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./util/loader"),
  cron = require("node-cron"),
  fetch = require("node-fetch"),
  moment = require("moment");

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.config = require("./config");
["commands", " s"].forEach((x) => (client[x] = new Collection()));
client.info = require("./assets/info.json");

loadCommands(client);
loadEvents(client);

client.login(client.config.TOKEN);

cron.schedule("30 14 * * *", async () => {
  let colors = [
    "#ED4245",
    "#F9A72D",
    "#5865F2",
    "#57F287",
    "#5BD7E5",
    "#E367D3",
    "#FEE75C",
    "#B05AE9",
    "#ffffff",
    "#EB459E",
  ];

  var color = colors[Math.floor(Math.random() * colors.length)];

  var pays = "france"; // votre pays
  var yesterday = "false";
  var twoDaysAgo = "false";

  const res = await fetch(
    `https://corona.lmao.ninja/v3/covid-19/countries/${pays}?yesterday=${yesterday}&twoDaysAgo=${twoDaysAgo}&allowNull=true`
  );
  const json = await res.json();
  if (json.message === "Country not found or doesn't have any cases")
    return message.channel.send(
      "Le pays n'a pas été trouvé\nEssayer de mieux l'écrire"
    );

  const embed = new MessageEmbed()
    .setURL(`https://stats-covid19.vercel.app/country/${json.country}`)
    .setColor(color)
    .setThumbnail(json.countryInfo.flag)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setTitle(`Stats du covid pour le pays **${json.country}**`)
    .addField("Cas", json.cases, true)
    .addField("Morts", json.deaths, true)
    .addField("Rétabli", json.recovered, true)
    .addField("Actif", json.active, true)
    .addField("Critique", json.critical, true)
    .addField("Tests", json.tests, true)
    .addField("Population", json.population, true)
    .addField(
      "Taux d'infection",
      (json.casesPerOneMillion / 10000).toFixed(3) + "%",
      true
    )
    .addField(
      "Taux de mortalité",
      ((json.deaths / json.cases) * 100).toFixed(3) + "%",
      true
    )
    .addField(
      "Taux critique",
      ((json.critical / json.active) * 100).toFixed(3) + "%",
      true
    )
    .addField(
      "Taux de récupération",
      ((json.recovered / json.cases) * 100).toFixed(3) + "%",
      true
    )
    .addField(
      "Taux de test",
      (json.testsPerOneMillion / 10000).toFixed(3) + "%",
      true
    )
    .addField(
      "Dernière mise à jour",
      "`" + moment(json.updated).fromNow() + "`",
      true
    )
    .addField("ID", "`" + json.countryInfo._id + "`", true)
    .addField("iso3", "`" + json.countryInfo.iso3 + "`", true)
    .setFooter(client.info.em.footer);

  client.channels.cache.get("YOURCHANNELID").send(embed);
});
