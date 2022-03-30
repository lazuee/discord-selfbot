//require discord.js-selfbot-v13
const Discord = require('discord.js-selfbot-v13');
//require fs
const fs = require('fs');

//make a extend class from discord.js-selfbot-v13 of client class
class Core extends Discord.Client {
	constructor(options) {
		super(options);
	}

	//create a new method called handler, dont pass any arguments
	handler() {
		//log this message to the console, with the word Loading commands and events in front of it
		//to indicate that the commands and events are being loaded
		//the message will be in green
		console.log('Loading commands and events...'.green);

		//check commands folder for files that end with .js
		//create a new array called commandFiles that will hold all the files
		//create a new Collection called commands that will hold all the commandFiles
		const commandFiles = fs.readdirSync('./src/user/commands').filter((file) => file.endsWith('.js'));
		const commands = new Discord.Collection();

		//if the commandFile is not empty then loop through the commandFiles
		if (commandFiles.length > 0) {
			//loop through the commandFiles
			commandFiles.forEach((file) => {
				//require the file
				const command = require(`../commands/${file}`);
				//check if the command is a function, if it is, add it to the commands collection
				//with the name of the file without the .js extension
				//log the name of the command
				if (typeof command === 'function') {
					commands.set(file.slice(0, -3), command);

					//log the name of the command with green text
					console.log(`Loaded command: ${file.slice(0, -3).green}`);
				}
			});
		}

		//if the commands collection is empty
		//log this message to the console, with the word No commands found in front of it
		//to indicate that there are no commands to load
		//the message will be in red
		if (commands.size === 0) {
			console.log('No commands found'.red);
		}

		//then pass the commands to the core variable
		this.commands = commands;

		//and also do the same for events and call the listener
		const eventFiles = fs.readdirSync('./src/user/events').filter((file) => file.endsWith('.js'));
		const events = new Discord.Collection();

		//if the eventFiles is not empty then loop through the eventFiles
		if (eventFiles.length > 0) {
			//loop through the eventFiles
			eventFiles.forEach((file) => {
				//require the file
				const event = require(`../events/${file}`);
				//check if the event is a function, if it is, add it to the events collection
				//with the name of the file without the .js extension
				//log the name of the event
				if (typeof event === 'function') {
					//add the event to the events collection
					events.set(file.slice(0, -3), event);
					//call the event to listen for the events
					//pass the core variable as an parameter
					this.on(file.slice(0, -3), event.bind(this));

					//log the event that is being listened for with green text
					console.log(`Loaded event: ${file.slice(0, -3).green}`);
				}
			});
		}

		//also do the same for the commands, check if events is empty
		//if it is, log this message to the console, with the word No events found in front of it
		//to indicate that there are no events to load
		//the message will be in red
		if (events.size === 0) {
			console.log('No events found'.red);
		}

		//then pass the events to the core variable
		this.events = events;
	}

	//create a new method called login that will login with the token from process.env.TOKEN
	login() {
		//call the super login method from discord.js-selfbot-v13
		//if the login is successful, call the handler method to load the commands and events
		super.login(process.env.TOKEN).then(() => this.handler());
		//if the login is unsuccessful, log the error
		this.on('error', console.error);
	}
}

module.exports = Core;
