
exports.register = function (app) {

	// poems Routers
	let poemsRouter = require('../routes/poems/poems');
	let poetsRouter = require('../routes/poems/poets');
	let booksRouter = require('../routes/poems/books');
	let sentencesRouter = require('../routes/poems/sentences');
	let booksCatalogueRouter = require('../routes/poems/bookscatalogue');


	// poems route
	app.use('/poems',poemsRouter);
	app.use('/poets',poetsRouter);
	app.use('/books',booksRouter);
	app.use('/sentences',sentencesRouter);
	app.use('/bookscatalogue',booksCatalogueRouter);
}