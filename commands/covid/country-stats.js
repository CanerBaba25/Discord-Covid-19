const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const emojiCharacters = require('../misc/emojicharacters');

module.exports = {
    name: "country",
    aliases: ["ülke", "ülkeler", "ülk"],
    description: "Ülke genelindeki Covid-19 istatistikleri gösterir",
    run: async (client, message, args) => {

        if(!args[0]){
            let embedsay = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Bir hata oluştu...')
                .setDescription('Hangi ülke olduğunu söylemeyi unuttun sanırım!')
                .addField('Ülke istatistiklerini görmek için!', "+ülke [Ülke İsimi]", true)
                .setFooter(`${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, 'https://i.imgur.com/TQPun1u.jpg');
            message.channel.send(embedsay);
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
                    let embedsay = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle(country_stat.country_name.toString())
                        .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
                        .setDescription(country_stat.country_name.toString() + " de ki Covid-19 istatistikler")
                        .addField(emojiCharacters.pensive + ' Toplam Vakalar', country_stat.cases.toString(), false)
                        .addField(emojiCharacters.crying + ' Toplam Ölümler', country_stat.deaths.toString(), false)
                        .addField(emojiCharacters.dancing_women + ' Toplam İyileşenler', country_stat.total_recovered.toString(), false)
                        .addField(emojiCharacters.new + ' Yeni Vakalar', country_stat.new_cases.toString(), false)
                        .addField(emojiCharacters.new + ' Yeni Ölümler', country_stat.new_deaths.toString(), false)
                        .addField(emojiCharacters.sad + ' Ağır Vakalar', country_stat.serious_critical.toString(), false)
                        .addField(emojiCharacters.mask + ' Aktif Vakalar', country_stat.active_cases.toString(), false)
                        .setFooter(`${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, 'https://i.imgur.com/TQPun1u.jpg');
                    message.channel.send(embedsay);
                }else{
                    let embedsay = new MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle('Bir hata oluştu...')
                        .setDescription('Bu ülkeyi bulamıyorum. Ülke isimlerini ingilizce olarak yazmayı deneyin!!!')
                        .addField('`+ülke Fransa` yerine', "`+ülke France` yazmayı deneyin ", true)
                        .setFooter(`${client.user.username} İstatistik | Powered by ${client.users.cache.get("384922905575686147").tag}`, 'https://i.imgur.com/TQPun1u.jpg');
                    message.channel.send(embedsay);   
                }
                
            })();
        }

    }
}