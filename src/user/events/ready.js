//create a function called ready, dont pass any arguments
function ready() {
	//log the user tag that is logged in to the console
	//with the word Logged in to the console in front of it
	//the message will be in green
	console.log(`Logged in as ${this.user.tag}`.green);

	//require and call the randomStatus function
	//bind the randomStatus function to the client
	//set the interval to call the randomStatus function every 5 minutes
	require('../functions/status').bind(this)(300000);

	//require express.js and create a variable called app on the client then set it to an express server
	const app = (this.app = require('express')());
	//require and call the routes function
	//bind the routes function to the client and pass the app as an argument
	require('../functions/routes').bind(this)(app);
}

//export the ready function
module.exports = ready;
