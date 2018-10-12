exports.register = function (app) {

	// admin Routers
	let registerRouter = require('../routes/admin/register');
	let logoutRouter = require('../routes/admin/logout');
	let infoRouter = require('../routes/admin/info');



	// admin route
	app.use('/register',registerRouter);
	app.use('/logout',logoutRouter);
	app.use('/info',info);
}