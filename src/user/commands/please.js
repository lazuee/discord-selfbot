//require util to use inspect
const inspect = require('util').inspect;
//require discord.js-selfbot-v13 to use MessageAttachment
const MessageAttachment = require('discord.js-selfbot-v13').MessageAttachment;

//create a function called please, pass the message, and args as arguments
/** @param {import("discord.js-selfbot-v13").Message} message
 * @param {string[]} args */
function please(message, args) {
	//split the process.env.DEV_IDS into an array by the comma
	//after the split, check if the message author id is in the array
	//if not, return
	if (!process.env.DEV_IDS.split(',').includes(message.author.id)) return;

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
				//if the result is not a string
				if (typeof result !== 'string') {
					//inspect the result and set it to the result variable
					result = inspect(result);
				}
				//send a message to the channel the message was sent in
				//if the result length is greater than 4000 characters
				if (result.length > 4000) {
					//send it as a file
					message.channel.send({
						files: [
							//create a instance of a MessageAttachment with the result
							new MessageAttachment(Buffer.from(String(result)), 'eval.js'),
						],
					});
				} else {
					//send the result as a message
					message.channel.send({ content: `\`\`\`js\n${result}\`\`\`` });
				}
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

//export the please function
module.exports = please;
