//require discord-rpc-contructor to create a RichPresence
const RichPresence = require('discord-rpc-contructor');
//create a variable called statuses and set it to an array of strings
const statuses = [
	'Be comfortable with your own body',
	'Dont be afraid to be yourself',
	'Be a good person',
	'Dont bully yourself',
];

//create a function called randomStatus, dont pass any arguments
function randomStatus() {
	//create a variable called status and set it to a random item from the statuses array
	const status = statuses[Math.floor(Math.random() * statuses.length)];

	//set the status to the random string
	this.status = new RichPresence.CustomStatus().setState(status).toDiscord();

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
