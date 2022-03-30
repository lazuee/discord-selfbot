//require dotenv/config to read the .env file
require('dotenv').config();
//require colors to add colors to the console
require('colors');

//log unexpected errors to the console in red with the word Unexpected error in front of it
//of course, this is only for unexpected errors, not for errors that are expected
process.on('unhandledRejection', (err) => {
	console.error(`Unexpected error: ${err.message}`.red);
});

//also log the uncaught exceptions to the console in red with the word Uncaught exception in front of it
process.on('uncaughtException', (err) => {
	console.error(`Uncaught exception: ${err.message}`.red);
});

//check if the token and the prefix are set in the .env file
if (!process.env.TOKEN || !process.env.PREFIX) {
	//if not, throw an error
	throw new Error('Please set your token and prefix in the .env file');
}

//if the token and the prefix are set, then require user/index.js to run the code
require('./user/index.js');
