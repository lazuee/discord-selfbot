//create a function called server, pass the app as an argument
/**
 * @param {import("express").Express} app
 */
function routes(app) {
	//setup the app to use express.js
	//set the app to use the json middleware
	app.use(require('express').json());
	//set the app to use the url encoded middleware
	app.use(require('express').urlencoded({ extended: true }));

	//set json as the default content type
	app.use((req, res, next) => {
		res.set('Content-Type', 'application/json');
		next();
	});

	//configure the default app settings
	app.set('trust proxy', true);
	app.set('x-powered-by', false);
	app.set('etag', false);
	app.set('strict routing', true);
	app.set('case sensitive routing', true);

	//make json pretty
	app.set('json spaces', 2);

	//check files in the routes folder with the extension .js
	//don't include the index.js file in the search
	//for each file found, require the file and call the function
	//bind the function to the client and pass the app as an argument
	require('fs')
		.readdirSync('./src/user/functions/routes')
		.filter((file) => file.endsWith('.js') && file !== 'index.js')
		.forEach((file) => require(`./${file}`).bind(this)(app));

	//set port to the port in the .env file or to 3000 if it doesn't exist
	//use app.set to set the port
	app.set('port', process.env.PORT || 3000);

	//listen to the app, use the port set above
	//use app.listen to listen to the app
	app.listen(app.get('port'), () => {
		//log the port the server is listening on in green
		//with the word listening in front of it
		//the message will be in green
		console.log(`Listening on port ${app.get('port')}`.green);
	});
}

//export the server function
module.exports = routes;
