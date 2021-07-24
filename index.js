const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client({
  ws: {
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS']
  },
  partials: ['REACTION', 'MESSAGE']
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Fetching message failed: ', error);
    }
  }
  if (!user.bot) {
        if (reaction.emoji.name === '⚠️') {
		if (reaction.message.channel.id === '845352022428483624') {
			if (reaction.message.id === '847672394717069334') {
			  let role = reaction.message.guild.roles.cache.find(role => role.name === "NSFW");
			  if (role) {
				reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(role);
			  }
	  		}
		}
	}
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.partial) {
	try {
		await reaction.fetch();
	} catch (error) {
		console.error('Fetching message failed: ', error);
	}
  }
  if (!user.bot) {
	if (reaction.emoji.name === '⚠️') {
		if (reaction.message.channel.id === '845352022428483624') {
			if (reaction.message.id === '847672394717069334') {
				let role = reaction.message.guild.roles.cache.find(role => role.name === "NSFW");
				if (role) {
					reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(role);
				}
			}
		}
	}
  }
});

client.on('message', message => {
	if (message.type === 'GUILD_MEMBER_JOIN') {
		console.log(`New User Logged In: ${message.author.tag}`);
		console.log(message);
		try {
			let role = message.channel.guild.roles.cache.find(role => role.name === "Members");
		} catch (error) {
			console.log(message);
			console.log('Error message: ', error);
		}
		try {
			if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
		} catch (error) {
			console.log(message);
			console.log('Error Message: ', error);
		}
	}
    }
});

client.once('ready', () => {
  console.log('Ready!');
});

client.login(token);
