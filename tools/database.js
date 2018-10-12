
var mongoClient = require('mongodb').MongoClient
var dbURL = 'mongodb://localhost:27017'

exports.database = function (collectionName,query,project,sort,req, res, skipnum,limitnum) {	
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const hcpoems = db.db('hcpoems')
		const table = hcpoems.collection(collectionName)

		table.find(query).project(project).sort(sort).skip(skipnum * limitnum).limit(limitnum).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
}

