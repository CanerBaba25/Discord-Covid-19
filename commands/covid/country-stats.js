const { EmbedBuilder } = require("discord.js");
const fetch = require('node-fetch');
const emojiCharacters = require('../misc/emojicharacters');

module.exports = {
    name: "country",
    aliases: ["ülke", "ülkeler", "ülk"],
    description: "Ülke genelindeki Covid-19 istatistikleri gösterir",
    run: async (client, message, args) => {

        if(!args[0]){
            let embedsay = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Bir hata oluştu...')
                .setDescription('Hangi ülke olduğunu söylemeyi unuttun sanırım!')
                .addFields({ name: 'Ülke istatistiklerini görmek için!', value: "+ülke [Ülke İsimi]", inline: true })
                .setFooter({ text: `${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, iconURL: 'https://i.imgur.com/TQPun1u.jpg' });
            message.channel.send({ embeds: [embedsay] });
        } else {
            let country_name = args.join(' ');
            (async () => {
                const rawResponse = await fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
                    method: 'GET',
                    headers: {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "9b59f34ad9msh2e6730faa54d0b9p1cc2d1jsnf2b3d0fc2c43"
                    }
                });
                const content = await rawResponse.json();
                let country_stat = undefined;
                for (let i = 0; i < content.countries_stat.length; i++) {
                    if (content.countries_stat[i].country_name === country_name) {
                        country_stat = content.countries_stat[i];
                    }
                }
                if(country_stat){
                    let embedsay = new EmbedBuilder()
                        .setColor('Random')
                        .setTitle(country_stat.country_name.toString())
                        .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
                        .setDescription(country_stat.country_name.toString() + " de ki Covid-19 istatistikler")
                        .addFields(
                            { name: emojiCharacters.pensive + ' Toplam Vakalar', value: country_stat.cases.toString(), inline: false },
                            { name: emojiCharacters.crying + ' Toplam Ölümler', value: country_stat.deaths.toString(), inline: false },
                            { name: emojiCharacters.dancing_women + ' Toplam İyileşenler', value: country_stat.total_recovered.toString(), inline: false },
                            { name: emojiCharacters.new + ' Yeni Vakalar', value: country_stat.new_cases.toString(), inline: false },
                            { name: emojiCharacters.new + ' Yeni Ölümler', value: country_stat.new_deaths.toString(), inline: false },
                            { name: emojiCharacters.sad + ' Ağır Vakalar', value: country_stat.serious_critical.toString(), inline: false },
                            { name: emojiCharacters.mask + ' Aktif Vakalar', value: country_stat.active_cases.toString(), inline: false }
                        )
                        .setFooter({ text: `${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, iconURL: 'https://i.imgur.com/TQPun1u.jpg' });
                    message.channel.send({ embeds: [embedsay] });
                }else{
                    let embedsay = new EmbedBuilder()
                        .setColor('#FF0000')
                        .setTitle('Bir hata oluştu...')
                        .setDescription('Bu ülkeyi bulamıyorum. Ülke isimlerini ingilizce olarak yazmayı deneyin!!!')
                        .addFields({ name: '`+ülke Fransa` yerine', value: "`+ülke France` yazmayı deneyin ", inline: true })
                        .setFooter({ text: `${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, iconURL: 'https://i.imgur.com/TQPun1u.jpg' });
                    message.channel.send({ embeds: [embedsay] });   
                }
                
            })();
        }

    }
}