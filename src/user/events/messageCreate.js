//create a function called messageCreate, pass the message as an argument
function messageCreate(message) {
	//check if the message is not empty
	if (message.content) {
		//check if the message starts with the prefix from the .env file
		if (message.content.startsWith(process.env.PREFIX)) {
			//if it does, then get the command from the message
			//and remove the prefix from the message
			const command = message.content.slice(process.env.PREFIX.length).split(' ')[0];
			//check if the command is in the commands collection
			if (this.commands.has(command)) {
				//if it is, then call the command and bind it to the message
				//check if the command is a function
				if (typeof this.commands.get(command) === 'function') {
					//if it is, then call the command and bind it to the message
					//if the command is working properly, then log the command to the console in green
					//if the command is not working properly, then log the command to the console in red
					//use try catch to catch any errors that may occur
					try {
						this.commands.get(command).bind(this)(message);
						console.log(`Command ${command} executed by ${message.author.tag}`.green);
					} catch (err) {
						console.error(`Command ${command} failed to execute: ${err.message}`.red);
					}
				} else {
					//if it is not, then log the command to the console in red
					console.error(`Command ${command} is not a function`.red);
				}
			}
		}
	}
}

//export the messageCreate function
module.exports = messageCreate;
