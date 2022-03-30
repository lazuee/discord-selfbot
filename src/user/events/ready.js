//create a function called ready, dont pass any arguments
function ready() {
	//log the user tag that is logged in to the console
	//with the word Logged in to the console in front of it
	//the message will be in green
	console.log(`Logged in as ${this.user.tag}`.green);

	//require and call the randomStatus function
	//bind the randomStatus function to the client
	//set the interval to call the randomStatus function every 3 minutes
	require('../functions/status').bind(this)(180000);
}

//export the ready function
module.exports = ready;
