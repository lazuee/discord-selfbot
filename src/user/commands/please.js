//create a function called please, pass the message, and args as arguments
/** @param {import("discord.js").Message} message */
/** @param {string[]} args */
function please(message, args) {
	//check if the author id is the same of core user id (this.user.id)
	if (message.author.id === this.user.id) {
		//then create a switch case for the first argument
		switch (args[0]) {
			//if the first argument is eval
			case 'eval':
				//if the args contains proces.env then send a messsage to the author
				if (args.includes('process.env')) {
					return message.author.send("You can't use process.env in eval.");
				}
				//try to eval the rest of the arguments
				try {
					//create a variable called result and set it to the eval result
					let result = eval(args.slice(1).join(' '));
					//send a message to the channel the message was sent in
					return message.channel.send({ content: `\`\`\`js\n${result}\n\`\`\`` });
				} catch (err) {
					//send a message to the channel the message was sent in
					return message.channel.send({ content: `\`\`\`js\n${err}\n\`\`\`` });
				}
				//break the switch case
				break;
			//if it's not in the switch case
			default:
				//do nothing
				break;
		}
	}
}

//export the please function
module.exports = please;
