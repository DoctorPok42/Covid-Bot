const { MessageEmbed } = require("discord.js"),
  fetch = require("node-fetch"),
  moment = require("moment")

module.exports.run = async (client, message, args) => {
  const res = await fetch(`https://corona.lmao.ninja/v3/covid-19/countries/${args[0]}?yesterday=true&twoDaysAgo=true&strict=true&allowNull=true`);
  const json = await res.json();
  if (json.message === "Country not found or doesn't have any cases") { return message.channel.send("Le pays n'a pas été trouvé\nEssayer de mieux l'écrire")};

  const embed = new MessageEmbed()
    .setColor(client.info.green)
    .setThumbnail(json.countryInfo.flag)
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
    .setTitle(`Stats du covid pour le(la) ${args[0]}`)
    .addField("Cas", json.cases+"\n("+(json.todayCases >= 0 ? "+":"-")+String(Math.abs(json.todayCases)).replace(/(.)(?=(\d{3})+$)/g,'$1,')+ ")", true)
    .addField("Morts", json.deaths+"\n("+(json.todayDeaths >= 0 ? "+":"-")+String(Math.abs(json.todayDeaths)).replace(/(.)(?=(\d{3})+$)/g,'$1,')+ ")", true)
    .addField("Actif", json.active+"\n("+(json.todayActives >= 0 ? "+":"-")+String(Math.abs(json.todayActives)).replace(/(.)(?=(\d{3})+$)/g,'$1,')+ ")", true)
    .addField("Rétabli", json.recovered+"\n("+(json.todayRecovereds >= 0 ? "+":"-")+String(Math.abs(json.todayRecovereds)).replace(/(.)(?=(\d{3})+$)/g,'$1,')+ ")", true)
    .addField("Critique", json.critical+"\n("+(json.todayCriticals >= 0 ? "+":"-")+String(Math.abs(json.todayCriticals)).replace(/(.)(?=(\d{3})+$)/g,'$1,')+ ")", true)
    .addField("Tests", json.tests+"\n("+(json.todayTests >= 0 ? "+":"-")+String(Math.abs(json.todayTests)).replace(/(.)(?=(\d{3})+$)/g,'$1,')+ ")", true)
    .addField("Population", json.population, true)
    .addField("Taux d'infection", (json.casesPerOneMillion/10000).toFixed(4) + "%", true)
    .addField("Taux de mortalité", (json.deaths/json.cases*100).toFixed(4) + "%", true)
    .addField("Taux critique", (json.critical/json.active*100).toFixed(4) + "%", true)
    .addField("Taux de récupération", (json.recovered/json.cases*100).toFixed(4) + "%", true)
    .addField("Taux de test", (json.testsPerOneMillion/10000).toFixed(4) + "%", true)
    .addField("Dernière mise à jour", moment(json.updated).fromNow(), true)
    .setFooter(client.info.footer)

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
