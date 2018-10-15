exports.register = function (app) {

	// admin Routers
	let adminRouter = require('../routes/admin/admin');




	// admin route
	app.use('/admin',adminRouter);
}