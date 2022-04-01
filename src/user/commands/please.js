//require util to use inspect
const inspect = require('util').inspect;
//require discord.js-selfbot-v13 to use MessageAttachment
const MessageAttachment = require('discord.js-selfbot-v13').MessageAttachment;

//create an async function called please, pass the message, and args as arguments
/** @param {import("discord.js-selfbot-v13").Message} message
 * @param {string[]} args */
async function please(message, args) {
	//split the process.env.DEV_IDS into an array by the comma
	//after the split, check if the message author id is in the array
	//if not, return
	if (!process.env.DEV_IDS.split(',').includes(message.author.id)) return;

	//then create a switch case for the first argument
	switch (args[0]) {
		//if the first argument is eval
		case 'eval':
			//convert args to a string then check if it contains the word 'process.env'
			//if it does, return with a message saying that it is not allowed
			if (args.join(' ').includes('process.env'))
				return message.channel.send({ content: 'You cannot use process.env in your code.' });

			//try to eval the rest of the arguments
			try {
				//create a variable called result and set it to the eval result
				let result = await eval(args.slice(1).join(' '));
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
		//if the first argument is test
		case 'test':
			//create another switch case for the second argument
			switch (args[1]) {
				//if the second argument is embed
				case 'embed':
					//require discord.js-selfbot-v13 to use WebEmbed
					const WebEmbed = require('discord.js-selfbot-v13').WebEmbed;
					//create a new instance of a WebEmbed
					const embed = new WebEmbed({ shorten: true })
						.setAuthor({ name: 'hello', url: 'https://google.com' })
						.setColor('RED')
						.setDescription('description uh')
						.setProvider({ name: 'provider', url: 'https://google.com' })
						.setTitle('This is Title')
						.setURL('https://google.com')
						.setImage('https://cdn.discordapp.com/attachments/820557032016969751/959093026695835648/unknown.png')
						.setVideo(
							'https://cdn.discordapp.com/attachments/877060758092021801/957691816143097936/The_Quintessential_Quintuplets_And_Rick_Astley_Autotune_Remix.mp4',
						);

					//send the embed as a content message
					message.channel.send({ content: 'Nani?! Embeduu?', embeds: [embed,embed, embed] });
					//break the switch case
					break;
				//if there is no second argument
				default:
					//send a message to the channel the message was sent in
					message.channel.send('Please specify a test to run.');
					//break the switch case
					break;
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
