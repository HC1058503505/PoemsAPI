
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'

exports.database = function (collectionName,query,project,sort,req, res, skipnum,limitnum) {	
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const hcpoems = db.db('hcpoems')
		const table = hcpoems.collection(collectionName)
		var totalItems = 0
		const queryObj = table.find(query).project(project).sort(sort)
		queryObj.count({},function (err, count) {
			// body...
			if (err) {
				res.json(err)
			}else {
				totalItems = count
			}
		})

		queryObj.skip(skipnum * limitnum).limit(limitnum).toArray(function (err,docs){
			if (err) {
				res.json(err)
			} else {
				res.send({'data' : {'count' : totalItems, 'result' : docs}})
			}
			
			res.end()
			db.close()
		})
		// table.find(query).project(project).sort(sort).skip(skipnum * limitnum).limit(limitnum).toArray(function (error, docs){
		// 	console.log(count)
		// 	res.send(docs)
		// 	res.end()
		// 	db.close()
		// })
	})
}

