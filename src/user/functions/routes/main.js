//create a function called mainPage, pass the app as an argument
function mainPage(app) {
	//create a get method for the root path
	app.get('/', (req, res) => {
		//send response with the json object { message: '🐱‍🏍🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀🐱‍👤'}
		res.json({ message: '🐱‍🏍🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀🐱‍👤' });
	});
}

//export the mainPage function
module.exports = mainPage;
