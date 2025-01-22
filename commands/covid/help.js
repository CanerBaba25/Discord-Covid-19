const { EmbedBuilder } = require("discord.js");
const emojiCharacters = require('../misc/emojicharacters');

module.exports = {
    name: "help",
    description: "Anubis Covid-19 botu hakkında bilği verir",
    run: async (client, message, args) => {

        let helpEmbed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Anubis Covid-19 İstatistik Bot Komutları')
        .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
        .setDescription("Anubis Covid-19 İstatistik Botu Anlık Olarak Dünyanın Etrafından Bilğileri Toplar Ve İsteğiniz Üzere Size Sunar")
        .addFields(
            { name: emojiCharacters.globe + 'Dünya İstatistikleri', value: '`+global`', inline: true },
            { name: emojiCharacters.barchart + 'Ülke İstatistikleri', value: '`+ülke [Ülke İsimi]`', inline: true }
        )
        .setFooter({ text: `${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, iconURL: 'https://i.imgur.com/TQPun1u.jpg' });
        message.channel.send({ embeds: [helpEmbed] });

    }
}