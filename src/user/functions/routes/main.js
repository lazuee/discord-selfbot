//create a function called mainPage, pass the app as an argument
/**
 * @param {import("express").Express} app
 */
function mainPage(app) {
	//create a get method for the root path
	app.get('/', (req, res) => {
		//send response with the json object { message: '🐱‍🏍🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀🐱‍👤'}
		res.json({ message: '🐱‍🏍🐱‍💻🐱‍🐉🐱‍👓🐱‍🚀🐱‍👤' });
	});

	//create a get method for the /info path
	app.get('/info', (req, res) => {
		//send response with the json object { message: '✨ info ✨'}
		res.json({
			message: '✨ info ✨',
			data: {
				//get the following information from the binded client
				//the user tag, the user id, the user avatar, the user discriminator, the user username
				tag: this.user.tag,
				id: this.user.id,
				avatar: this.user.avatar,
				discriminator: this.user.discriminator,
				username: this.user.username,
			},
		});
	});
}

//export the mainPage function
module.exports = mainPage;
