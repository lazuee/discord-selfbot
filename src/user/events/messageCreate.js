//create a function called messageCreate, pass the message as an argument
/** @param {import("discord.js").Message} message */
async function messageCreate(message) {
	//check if the message is not empty
	if (message.content) {
		//check if the message starts with the prefix from the .env file
		if (message.content.startsWith(process.env.PREFIX)) {
			//if it does, then get the command from the message
			//and remove the prefix from the message
			const command = message.content.slice(process.env.PREFIX.length).split(/ +/g)[0];
			//get the arguments from the message
			const args = message.content.slice(process.env.PREFIX.length).split(/ +/g).slice(1);

			//check if the command is in the commands collection
			if (this.commands.has(command)) {
				//check if the command is a function
				if (typeof this.commands.get(command) === 'function') {
					//if it is, then bind the function to the client
					//first, use try catch to catch any errors
					try {
						//before calling the command, send typing to the channel
						await message.channel
							.sendTyping()
							.then(() => {
								//wait for 1 seconds before calling the command
								//plus a random millisecond to make it look more natural to the user
								//and pass the message and arguments as arguments
								setTimeout(
									() => this.commands.get(command).bind(this)(message, args),
									1000 + Math.floor(Math.random() * 1000),
								);
							})
							.then(() => {
								//after the command is called, log the command
								//the message will be in green
								console.log(`${message.author.tag} (${message.author.id}) ran the command ${command}`.green);
							});
					} catch (error) {
						//if there is an error, then log it in red
						//with the word Error in front of it
						//the message will be in red
						console.error(`Error: ${error}`.red);
					}

					//if the command is not a function
				} else {
					//log the command in red
					//with the word Error in front of it
					//the message will be in red
					console.error(`Error: ${command} is not a function`.red);
				}
			} else {
				//log the command in red
				//with the word Error in front of it
				//the message will be in red
				console.error(`Error: ${command} is not a command`.red);
			}
		}
	}
}

//export the messageCreate function
module.exports = messageCreate;
