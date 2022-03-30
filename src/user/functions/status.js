//require discord-rpc-contructor to create a RichPresence
const RichPresence = require('discord-rpc-contructor');
//create a variable called statuses and set it to an array of strings
const statuses = [
	'Sometimes doing nothing is better than doing nothing.',
	'You can do anything, but not everything.',
	'Procrastination is the art of keeping up with yesterday.',
	'Keep your eyes on the stars, and your feet on the ground.',
	'The only way to do great work is to love what you do.',
	'Life is 10% what happens to you and 90% how you react to it.',
	'The best way to predict your future is to create it.',
	'High expectations are often a stepping stone to worse things.',
];
//create a variable called clockEmoji and set it to an array of strings with the time emoji
//after the time emoji, select a emoji based of the 12 hour clock
const clockEmoji = ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'][new Date().getHours() % 12];

//create a function called randomStatus, dont pass any arguments
function randomStatus() {
	//create a variable called status and set it to a random string from the statuses array
	//avoid repeating the same status twice in a row
	const status = statuses.sort(function (a, b) {
		return 0.5 - Math.random(); // <— sort needs a number and this makes it work
	})[0];

	//create status to the client and create new instance of RichPresence.CustomStatus
	//use setStatus to set the status to the status variable
	//use setUnicodeEmoji to set the emoji to the clockEmoji variable
	this.status = new RichPresence.CustomStatus().setUnicodeEmoji(clockEmoji).setState(status).toDiscord();

	//set user activity to the status
	this.user.setActivity(this.status);
}

//create a function called setStatus, pass the delay as an argument
function setStatus(delay) {
	//first, run the randomStatus function
	randomStatus.bind(this)();

	//then, set the interval to call the randomStatus function every delay milliseconds
	//plus a random millisecond to make it look more natural to the user
	setInterval(randomStatus.bind(this), delay + Math.floor(Math.random() * 1000));
}

//export the setStatus function
module.exports = setStatus;
