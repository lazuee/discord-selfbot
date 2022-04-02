//require collections from discord.js-selfbot-v13
const Collection = require('discord.js-selfbot-v13').Collection;
//create a function called user_activity, dont pass any arguments
function user_activity() {
	//create a new object called activities then add the following properties to it
	//message: {}
	this.activities = {
		message: {},
	};
	//listen for the messageCreate event and pass the message as an argument
	this.on('messageCreate', (message) => {
		//check if the author is the client, if not, then return
		if (message.author.id !== this.user.id) return;
		//then save the message in the activities.message with 'created' as the key
		//only save the nessecary information
		this.activities.message.created = {
			id: message.id,
			content: message.content,
			channel: {
				id: message.channel.id,
				name: message.channel.name,
			},
			guild: {
				id: message.guild.id,
				name: message.guild.name,
			},
			createdAt: message.createdAt,
		};
		//after that, log the message to the console with the following message
		//"Message created: " in front of it in green
		console.log(`Message created: ${message.content}`.green);
	});

	//listen for the messageUpdate event and pass the oldMessage and newMessage as arguments
	this.on('messageUpdate', (oldMessage, newMessage) => {
		//check if the author is the client, if not, then return
		if (newMessage.author.id !== this.user.id) return;
		//then check if the oldMessage and newMessage are the same, if it is, then return
		if (oldMessage.content === newMessage.content) return;
		//then save the newMessage to the activities.message with 'updated' as the key
		//only save the nessesary information
		this.activities.message.updated = {
			old: {
				id: oldMessage.id,
				content: oldMessage.content,
				channel: {
					id: oldMessage.channel.id,
					name: oldMessage.channel.name,
				},
				guild: {
					id: oldMessage.guild.id,
					name: oldMessage.guild.name,
				},
				createdAt: oldMessage.createdAt,
			},
			new: {
				id: newMessage.id,
				content: newMessage.content,
				channel: {
					id: newMessage.channel.id,
					name: newMessage.channel.name,
				},
				guild: {
					id: newMessage.guild.id,
					name: newMessage.guild.name,
				},
				editedAt: newMessage.editedAt,
			},
		};
		//after that, log the message to the console with the following message
		//"Message updated: " in front of it in blue
		console.log(`Message updated: ${newMessage.content}`.blue);
	});

	//listen for the messageDelete event and pass the message as an argument
	this.on('messageDelete', (message) => {
		//check if the author is the client, if not, then return
		if (message.author.id !== this.user.id) return;
		//check if the created and updated content is the same as the content of the message
		//if it is, then delete the created and updated object from the activities.message
		//before that, check if the activities.message.created and activities.message.updated are not undefined
		if (this.activities.message.created && this.activities.message.created.content === message.content) {
			delete this.activities.message.created;
		}
		if (this.activities.message.updated && this.activities.message.updated.new.content === message.content) {
			delete this.activities.message.updated;
		}
		//then save the message to the activities.message with 'deleted' as the key
		//only save the nessecary information
		this.activities.message.deleted = {
			id: message.id,
			content: message.content,
			channel: {
				id: message.channel.id,
				name: message.channel.name,
			},
			guild: {
				id: message.guild.id,
				name: message.guild.name,
			},
		};
		//after that, log the message to the console with the following message
		//"Deleted message in {channel}" in yellow
		console.log(`Deleted message in ${message.channel.name}`.yellow);
	});
}

//export the user_activity function
module.exports = user_activity;
