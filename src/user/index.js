//get Core class from src\user\core\index.js
const Core = require('./core');

//create a new instance of Core class
const core = new Core();

//call the login method from Core class
core.login();

//then export the core variable
module.exports = core;
