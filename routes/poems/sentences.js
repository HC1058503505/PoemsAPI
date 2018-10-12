var express = require('express')
var router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'


function responseAction(collectionName,query,req, res, pagenum,limitnum) {
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const books = db.db('hcpoems')
		const sentences = books.collection(collectionName)

		sentences.find(query).skip(pagenum * limitnum).limit(limitnum).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
}

/**
 * @api {get} /sentences/page/:page/limit/:limit 名句列表
 * @apiSampleRequest https://localhost:18081/sentences/page/:page/limit/:limit
 * @apiDescription 名句列表
 * @apiName 名句列表
 * @apiGroup Sentences
 * @apiParam {Int} page 页数
 * @apiParam {Int} limit 每页的数据个数
 * @apiSuccessExample {json} Success-Response:
 *  [
 *      {
 *      	_id: "5bbead151ae43c720720518f",
 *      	sentence_theme: "爱情",
 *      	sentence_category: "抒情",
 *      	gujiyiwen: "",
 *      	zhangjie_id: "",
 *      	isPoem: true,
 *      	sentence_content: "玲珑骰子安红豆，入骨相思知不知。",
 *      	zhangjie_name: "",
 *      	sentence_id: "a1e34e2152e2",
 *      	sentence_poem_title: "南歌子词二首 / 新添声杨柳枝词",
 *      	sentence_poem_author: "温庭筠",
 *      	sentence_poem_id: "a2b349dd32e8"
 *      }, {
 *      	_id: "5bbead151ae43c7207205190",
 *      	sentence_theme: "爱情",
 *      	sentence_category: "抒情",
 *      	gujiyiwen: "",
 *      	zhangjie_id: "",
 *      	isPoem: true,
 *      	sentence_content: "平生不会相思，才会相思，便害相思。",
 *      	zhangjie_name: "",
 *      	sentence_id: "55fd5f7d549c",
 *      	sentence_poem_title: "折桂令·春情",
 *      	sentence_poem_author: "徐再思",
 *      	sentence_poem_id: "c439b578d976"
 *      },
 *      .
 *      .
 *      .
 * ]
 * @apiVersion 1.0.0
 */
router.get('/page/:page/limit/:limit',function(req, res){
	var pageNum = parseInt(req.params.page)
	var limitnum = parseInt(req.params.limit)

	if (isNaN(pageNum)) {
		pageNum = 0
	}

	if (isNaN(limitnum)) {
		limitnum = 10
	}
	var query = {}
	responseAction('sentences',query, req,res, pageNum,limitnum)
})


/**
 * @api {get} /sentences/id/:sentence_id 以id查询名句
 * @apiSampleRequest https://localhost:18081/sentences/id/:sentence_id
 * @apiDescription 以id查询名句
 * @apiName 以id查询名句
 * @apiGroup Sentences
 * @apiParam {String} sentence_id 名句id
 * @apiSuccessExample {json} Success-Response:
 * [
 *      {
 *      	_id: "5bbead151ae43c720720553b",
 *      	sentence_theme: "友情",
 *      	sentence_category: "抒情",
 *      	gujiyiwen: "",
 *      	zhangjie_id: "",
 *      	isPoem: true,
 *      	sentence_content: "相逢成夜宿，陇月向人圆。",
 *      	zhangjie_name: "",
 *      	sentence_id: "8bc92f5d37cd",
 *      	sentence_poem_title: "宿赞公房",
 *      	sentence_poem_author: "杜甫",
 *      	sentence_poem_id: "b6817de4aa36"
 *      }, {
 *      	_id: "5bbead151ae43c72072066e0",
 *      	sentence_theme: "月亮",
 *      	sentence_category: "天气",
 *      	gujiyiwen: "",
 *      	zhangjie_id: "",
 *      	isPoem: true,
 *      	sentence_content: "相逢成夜宿，陇月向人圆。",
 *      	zhangjie_name: "",
 *      	sentence_id: "8bc92f5d37cd",
 *      	sentence_poem_title: "宿赞公房",
 *      	sentence_poem_author: "杜甫",
 *      	sentence_poem_id: "b6817de4aa36"
 *      }
 * ]
 * @apiVersion 1.0.0
 */
router.get('/id/:sentence_id',function(req, res){
	
		var query = {
			'sentence_id' : req.params.sentence_id
		}
		responseAction('sentences',query,req, res,0,0)
})


/**
 * @api {get} /sentences/theme/:sentence_theme/category/:sentence_category/page/:page/limit/:limit 以类型查询名句
 * @apiSampleRequest https://localhost:18081/sentences/theme/:sentence_theme/category/:sentence_category/page/:page/limit/:limit
 * @apiDescription 以类型查询名句
 * @apiName 以类型查询名句
 * @apiGroup Sentences
 * @apiParam {String} sentence_theme 名句主题
 * @apiParam {String} sentence_category 名句分类
 * @apiParam {Int} page 页数
 * @apiParam {Int} limit 每页的数据个数
 * @apiSuccessExample {json} Success-Response:
 * [
 *      {
 *      	_id: "5bbead151ae43c720720518f",
 *      	sentence_theme: "爱情",
 *      	sentence_category: "抒情",
 *      	gujiyiwen: "",
 *      	zhangjie_id: "",
 *      	isPoem: true,
 *      	sentence_content: "玲珑骰子安红豆，入骨相思知不知。",
 *      	zhangjie_name: "",
 *      	sentence_id: "a1e34e2152e2",
 *      	sentence_poem_title: "南歌子词二首 / 新添声杨柳枝词",
 *      	sentence_poem_author: "温庭筠",
 *      	sentence_poem_id: "a2b349dd32e8"
 *      }, {
 *      	_id: "5bbead151ae43c7207205190",
 *      	sentence_theme: "爱情",
 *      	sentence_category: "抒情",
 *      	gujiyiwen: "",
 *      	zhangjie_id: "",
 *      	isPoem: true,
 *      	sentence_content: "平生不会相思，才会相思，便害相思。",
 *      	zhangjie_name: "",
 *      	sentence_id: "55fd5f7d549c",
 *      	sentence_poem_title: "折桂令·春情",
 *      	sentence_poem_author: "徐再思",
 *      	sentence_poem_id: "c439b578d976"
 *      },
 *      .
 *      .
 *      .
 * ]
 * @apiVersion 1.0.0
 */
router.get('/theme/:sentence_theme/category/:sentence_category/page/:page/limit/:limit',function(req, res){
	var pageNum = parseInt(req.params.page)
	var limitnum = parseInt(req.params.limit)

	if (isNaN(pageNum)) {
		pageNum = 0
	}

	if (isNaN(limitnum)) {
		limitnum = 10
	}

	var query = {
		'sentence_theme' : req.params.sentence_theme,
		'sentence_category' : req.params.sentence_category
	}
	responseAction('sentences',query,req, res, pageNum,limitnum)
})

module.exports = router;