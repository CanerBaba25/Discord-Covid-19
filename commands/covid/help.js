const { MessageEmbed } = require("discord.js");
const emojiCharacters = require('../misc/emojicharacters');

module.exports = {
    name: "help",
    description: "Anubis Covid-19 botu hakkında bilği verir",
    run: async (client, message, args) => {

        let helpEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Anubis Covid-19 İstatistik Bot Komutları')
        .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
        .setDescription("Anubis Covid-19 İstatistik Botu Anlık Olarak Dünyanın Etrafından Bilğileri Toplar Ve İsteğiniz Üzere Size Sunar")
        .addField(emojiCharacters.globe + 'Dünya İstatistikleri', '`+global`', true)
        .addField(emojiCharacters.barchart + 'Ülke İstatistikleri', '`+ülke [Ülke İsimi]`', true)
        .setFooter(`${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, 'https://i.imgur.com/TQPun1u.jpg');
        message.channel.send(helpEmbed);

    }
}