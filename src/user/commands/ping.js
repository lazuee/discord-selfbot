//create a function called ping, pass the message as an argument
function ping(message) {
	//send a message to the channel the message was sent in
	return message.channel.send('Pong!');
}

//export the ping function
module.exports = ping;
