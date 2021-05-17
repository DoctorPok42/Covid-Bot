const { MessageEmbed } = require("discord.js"),
  fetch = require("node-fetch"),
  moment = require("moment")

module.exports.run = async (client, message) => {
  const res = await fetch("https://corona.lmao.ninja/v3/covid-19/all?yesterday=true&twoDaysAgo=true&allowNull=true");
  const json = await res.json();

  const embed = new MessageEmbed()
    .setColor(client.info.blurple)
    .setThumbnail("https://cdn.discordapp.com/attachments/645330547647971341/843832605341646949/map.png")
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
    .setTitle("Stats total du covid")
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
    .addField("Pays infectés", json.affectedCountries, true)
    .addField("Dernière mise à jour", moment(json.updated).fromNow(), true)
    .setFooter(client.info.footer)

  message.channel.send(embed);
};

module.exports.help = {
  name: "all",
  aliases: ["all"],
  category: "covid",
  description: "Renvoie les stats total du covid",
  usage: "",
  args: false,
};
