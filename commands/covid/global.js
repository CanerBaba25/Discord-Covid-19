const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const emojiCharacters = require('../misc/emojicharacters');

module.exports = {
    name: "global",
    aliases: ["dünya"],
    description: "Dünya genelindeki Covid-19 istatistikleri gösterir",
    run: async (client, message, args) => {

        const rawResponse = await fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php', {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "9b59f34ad9msh2e6730faa54d0b9p1cc2d1jsnf2b3d0fc2c43"
            }
        });
        const content = await rawResponse.json();
        let embedsay = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Dünya Genelindeki Covid-19 İstatistikleri')
            .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
            .setDescription("İstatistikler; ölümler, vaka sayısı, vb. gösterir")
            .addField(emojiCharacters.pensive + ' Toplam Vakalar', content.total_cases.toString(), false)
            .addField(emojiCharacters.crying + ' Toplam Ölümler', content.total_deaths.toString(), false)
            .addField(emojiCharacters.dancing_women + ' Toplam İyileşenler', content.total_recovered.toString(), false)
            .addField(emojiCharacters.new + ' Yeni Vakalar', content.new_cases.toString(), false)
            .addField(emojiCharacters.new + ' Yeni Ölümler', content.new_deaths.toString(), false)
            .setFooter(`${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, 'https://i.imgur.com/TQPun1u.jpg');
        message.channel.send(embedsay);

    }
}