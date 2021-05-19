const { MessageEmbed } = require("discord.js"),
  fetch = require("node-fetch"),
  moment = require("moment")

module.exports.run = async (client, message, args) => {
  const res = await fetch(`https://corona.lmao.ninja/v3/covid-19/countries/${args[0]}?yesterday=true&twoDaysAgo=true&strict=true&allowNull=true`);
  const json = await res.json();
  if (json.message === "Country not found or doesn't have any cases") return message.channel.send("Le pays n'a pas été trouvé\nEssayer de mieux l'écrire");

  const embed = new MessageEmbed()
    .setColor(client.info.color.cyan)
    .setThumbnail(json.countryInfo.flag)
    .setAuthor(client.user.tag, client.user.displayAvatarURL())
    .setTitle(`Stats du covid sur le pays ${json.country}`)
    .addField("Cas", json.cases+"\n("+(json.todayCases >= 0 ? "+":"-")+String(Math.abs(json.todayCases)).replace(/(.)(?=(\d{3})+$)/g,'$1.')+ ")", true)
    .addField("Morts", json.deaths+"\n("+(json.todayDeaths >= 0 ? "+":"-")+String(Math.abs(json.todayDeaths)).replace(/(.)(?=(\d{3})+$)/g,'$1.')+ ")", true)
    .addField("Rétabli", json.recovered+"\n("+(json.todayRecovered >= 0 ? "+":"-")+String(Math.abs(json.todayRecovered)).replace(/(.)(?=(\d{3})+$)/g,'$1.')+ ")", true)
    .addField("Actif", json.active, true)
    .addField("Critique", json.critical, true)
    .addField("Tests", json.tests, true)
    .addField("Population", json.population, true)
    .addField("Taux d'infection", (json.casesPerOneMillion/10000).toFixed(3) + "%", true)
    .addField("Taux de mortalité", (json.deaths/json.cases*100).toFixed(3) + "%", true)
    .addField("Taux critique", (json.critical/json.active*100).toFixed(3) + "%", true)
    .addField("Taux de récupération", (json.recovered/json.cases*100).toFixed(3) + "%", true)
    .addField("Taux de test", (json.testsPerOneMillion/10000).toFixed(3) + "%", true)
    .addField("Dernière mise à jour", "\`"+moment(json.updated).fromNow()+"\`", true)
    .addField("ID", "\`"+json.countryInfo._id+"\`", true)
    .addField("iso3", "\`"+json.countryInfo.iso3+"\`", true)
    .setFooter(client.info.em.footer)

  message.channel.send(embed);
};

module.exports.help = {
  name: "pays",
  aliases: ["pays"],
  category: "covid",
  description: "Renvoie les stats d'un pays en particulier",
  usage: "<pays>",
  args: true,
};
