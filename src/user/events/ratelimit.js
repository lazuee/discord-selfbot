//create a function called ratelimit, pass the ratelimit as an argument
/** @param {import("discord.js-selfbot-v13").RateLimitData} ratelimit */
function ratelimit(ratelimit) {
	//if the ratelimit is a global ratelimit
	if (ratelimit.global) {
		//if it is a global ratelimit
		//then log the ratelimit with the message "Global Ratelimit"
		//the message will be in red
		console.error(`Global Ratelimit: ${ratelimit.path}`.red);
	} else {
		//if it is not a global ratelimit
		//then log the ratelimit with the message "Ratelimit"
		//the message will be in red
		console.error(`Ratelimit: ${ratelimit.path}`.red);
	}

    //after that kill the process using kill 1
    //this will stop the bot
    process.kill(1);
}

//export the ratelimit function
module.exports = ratelimit;
