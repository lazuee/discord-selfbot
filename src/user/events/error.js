//create a function called error, pass the error as an argument
/** @param {import("discord.js").Error} error */
function error(error) {
	//log the error in red
	//the message will be in red
	console.error(`Error: ${error}`.red);
}

//export the error function
module.exports = error;
