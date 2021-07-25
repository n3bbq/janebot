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
				}
			}
		}
	}
  }
});
client.on('guildMemberAdd', async (member) => {
	let role = guild.roles.cache.find(r => r.name === "Members") || await guild.roles.fetch('845355948750274582');
	console.log(role);
	if (!role) {
		console.log("Role doesn't exist.");
	}
	try {
		member.roles.add(role);
	}
	catch (error) {
		console.log("Unable to add role: ", error);
	}
});
client.on('message', async (message) => {
	if (message.partial) {
		try {
			await message.fetch();
		} catch (error) {
			console.error('Fetching mesage filed: ', error);
		}
	}
	if (message.type === 'GUILD_MEMBER_JOIN') {
		console.log(`New User Logged In: ${message.author.tag}`);
		//console.log(message);
		try 
		{
			role = message.channel.guild.roles.cache.find(r => r.name === "Members") || await message.channel.guild.roles.fetch('845355948750274582');
		} 
		catch (error) 
		{
			console.log(message);
			console.log('Unable to find role: ', error);
		}
		try 
		{
			console.log(message.channel.guild.roles.cache.find(r => r.name === "Members"));
			if (role) 
			{
				message.guild.members.cache.get(message.author.id).roles.add(role);
			}
			else
			{
				console.log('Error!  Role was not defined!??');
				//console.log(message);
				console.log(message.channel.guild.roles);
			}
		} 
		catch (error) 
		{
//			console.log(message);
//			console.log('User Roles: ', message.guild.members.cache.get(message.author.id).roles);
			console.log('Error setting role: ', error);
		}
	}
});

client.once('ready', () => {
  console.log('Ready!');
});

client.login(token);
