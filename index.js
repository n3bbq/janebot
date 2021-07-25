const Discord = require('discord.js');
const { prefix, token, memberRoleName, memberRoleId, botLogChannelId, welcomeChannelId } = require('./config.json');

const client = new Discord.Client({
	ws: {
		intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MEMBERS']
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
					let add_user = reaction.message.guild.members.cache.find(member => member.id === user.id);
					client.channels.cache.get(botLogChannelId).send('NSFW Added To: ' + add_user.nickname + '(' + add_user.user.username + '#' + add_user.user.discriminator + ')');
				}
				// Lets make sure they are in Members too
				let messagerole = reaction.message.guild.roles.cache.find(role => role.name === "Members");
				if (messagerole) {
					reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(messagerole);
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
						let remove_user = reaction.message.guild.members.cache.find(member => member.id === user.id);
						client.channels.cache.get(botLogChannelId).send('NSFW Removed From:  ' + remove_user.nickname + '(' + remove_user.user.username + '#' + remove_user.user.discriminator + ')');
					}
				}
			}
		}
	}
});
client.on('guildMemberAdd', async (member) => {
//	console.log(member);
	client.channels.cache.get(botLogChannelId).send('User Joined (but has not completed Rules agreement yet): ' + member.user.username + '#' + member.user.discriminator);
});

// Joining comes across as a message with a type of GUILD_MEMBER_JOIN
client.on('message', async (message) => {
	if (message.partial) {
		try {
			await message.fetch();
		} catch (error) {
			console.error('Fetching mesage filed: ', error);
		}
	}
	// We are only looking for non bot user messages...
	if (!message.author.bot) {
// Play area
//		console.log(message.member.roles.cache.has(memberRoleId));
		
// End Play area
		if (message.type === 'GUILD_MEMBER_JOIN') {
			console.log(`New User Logged In: ${message.author.tag}`);
			role = message.channel.guild.roles.cache.find(r => r.name === memberRoleName) || await message.channel.guild.roles.fetch(memberRoleId);
			if (role) {
				client.channels.cache.get(botLogChannelId).send('New User Logged In: ' + message.author.tag);
				try {
					message.guild.members.cache.get(message.author.id).roles.add(role)
						.then(member => {
							client.channels.cache.get(botLogChannelId).send('Members group assigned to: ' + message.author.tag);
							client.channels.cache.get(welcomeChannelId).send('Everyone please welcome ' + message.author.toString() + ' to the server!');
							message.delete({ timeout: 1000 })
								.then(msg => client.channels.cache.get(botLogChannelId).send('Deleted welcome message for ' + message.author.tag))
								.catch(console.error);
						}).catch(error => {
						});

				} catch(error) {
					client.channels.cache.get(botLogChannelId).send('Error Setting Role: ', error);
					console.log(message);
					console.log("Error! ", error);
				}
//				console.log(message);
			} else {
				console.log('Error!  Role was not defined!??');
				//console.log(message);
				client.channels.cache.get(botLogChannelId).send('Error!  Role was not defined??? (',message.author.tag,')');
				client.channels.cache.get(botLogChannelId).send(message.channel.guild.roles);
			} 
		}
	//console.log(message);
	}
});

client.once('ready', () => {
	client.channels.cache.get(botLogChannelId).send('Bot Now Online');
	console.log('Ready!');
});

client.login(token);
