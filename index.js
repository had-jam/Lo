// require the discord.js module
const Discord = require('discord.js')
const config = require('./config.json')
const command = require('./command')

// create the Discord client
const client = new Discord.Client()

// When the app is ready it will write out Ready using this
client.once('ready', () => {
    console.log('Ready!')

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', message => {
        client.guilds.cache.forEach(guild => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    })

    command(client, 'server', message => {
            message.channel.send(
                `${message.guild.name} has a total of ${message.guild.memberCount} members`
            )
    })

    client.user.setPresence({
        activity: {
            name: 'Ro watch Lynn',
            type: 3,
        },
    })

    command(client, 'status', (message) => {
        if (message.author.id === '128346198917644290') {
            const content = message.content.replace('!status ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
        }
        else {
            message.channel.send('Only Malek can change my status')
        }
    })

    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

})

// Replace the value between the quotes with your token
client.login(config.token);