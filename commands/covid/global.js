const { EmbedBuilder } = require("discord.js");
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
        let embedsay = new EmbedBuilder()
            .setColor('Random')
            .setTitle('Dünya Genelindeki Covid-19 İstatistikleri')
            .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
            .setDescription("İstatistikler; ölümler, vaka sayısı, vb. gösterir")
            .addFields(
                { name: emojiCharacters.pensive + ' Toplam Vakalar', value: content.total_cases.toString(), inline: false },
                { name: emojiCharacters.crying + ' Toplam Ölümler', value: content.total_deaths.toString(), inline: false },
                { name: emojiCharacters.dancing_women + ' Toplam İyileşenler', value: content.total_recovered.toString(), inline: false },
                { name: emojiCharacters.new + ' Yeni Vakalar', value: content.new_cases.toString(), inline: false },
                { name: emojiCharacters.new + ' Yeni Ölümler', value: content.new_deaths.toString(), inline: false }
            )
            .setFooter({ text: `${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, iconURL: 'https://i.imgur.com/TQPun1u.jpg' });
        message.channel.send({ embeds: [embedsay] });

    }
}