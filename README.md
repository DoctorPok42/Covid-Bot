<div align="center">
  <img src="https://github.com/DoctorPok42/Covid-Bot/blob/main/assets/logo.png">
</div>

# Covid-Bot [![CodeFactor](https://www.codefactor.io/repository/github/doctorpok42/covid-bot/badge)](https://www.codefactor.io/repository/github/doctorpok42/covid-bot)

C'est un petit Bot pour Discord qui, pour l'instant, récolte des information sur la covid-19 quand on lui demande.

Pour l'instant il ne dispose que de 6 commandes (2 covids et 6 generales) mais il est voué à augmenter ! :wink:

<hr/>

# Mise en place

  1) Tout d'abords téléchargez intégralement le repo
 
  2) Ensuite installer les packages en faisant `npm i` dans votre terminal (à la racine du dossier)

  3) Mettez le token de votre bot dans le fichier `config.js` à la ligne `2`

  4) Vous pouvez aussi changer l'activité du bot ainsi que son type, son status et son prefix dans le fichier `config.js`

  5) Dérnièrement vous pouvez modifier l'id du channel où le bot enverra le message quand il sera en ligne, dans le fichier `./events/ready.js` à la ligne `12`

### Si vous faites tout cela merci de respecter les crédit qui sont dans le fichier *package.json* et le *footer* de chaque embed

<hr/>

# Module Cron

Ce module qui ce trouve dans le fichier principale à partir de la ligne `17`, vous permez de poster les stats du covid d'un pays en particulier de manière journalière !

## Paramétrage

* Obligatoire 
  - Changer l'id du channel discord à la ligne `53`

* Facultatif
  - Changer le pays recherché à la ligne `23`
  - Changer les paramètres `yesterday` et `twoDaysAgo` au ligne `24` et `25`, permettans de prendre en compte les stats du covid remontant à 1 ou 2 jours.

<hr/>

[![Contributors Display](https://badges.pufler.dev/contributors/DoctorPok42/Covid-Bot?size=50&padding=5&bots=true)](https://badges.pufler.dev)
DoctorPok

<hr/>

<div align="center">
  <img src="https://github.com/DoctorPok42/Covid-Bot/blob/main/assets/img.PNG">
</div>
