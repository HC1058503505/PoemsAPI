var express = require('express')
var router = express.Router()
var mongoClient = require('mongodb').MongoClient
var dbURL = 'mongodb://localhost:27017'

function responseAction(collectionName,query,project,req, res, skipnum,limitnum) {	
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const hcpoems = db.db('hcpoems')
		const table = hcpoems.collection(collectionName)

		table.find(query).project(project).skip(skipnum * limitnum).limit(limitnum).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
}


/**
 * @api {get} /books/page/:page/limit/:limit 分页古书籍列表
 * @apiSampleRequest https://localhost:18081/books/page/:page/limit/:limit
 * @apiDescription 分页古书籍列表
 * @apiName 分页古书籍列表
 * @apiGroup Books
 * @apiParam {Int} page 页数
 * @apiParam {Int} limit 每页的数据个数
 * @apiSuccessExample {json} Success-Response:
 * [
 *	{
 *		"_id": "5b9b35f0aaa98b0dfadf42ca",
 *		"book_abstract": "《般若波罗蜜多心经》也称为《摩诃般若波罗蜜多心经》，简称《般若心经》或《心经》，是般若经系列中一部言简义丰、博大精深、提纲挈领、极为重要的经典，为大乘佛教出家及在家佛教徒日常背诵的佛经。现以唐代三藏法师玄奘译本为最流行。",
 *		"book_img": "xinjing.jpg",
 *		"book_id": 152,
 *		"book_name": "心经"
 *	},
 *	{
 *		"_id": "5b9b35efaaa98b0dfadf42c7",
 *		"book_abstract": "《三十六计》或称“三十六策”，是指中国古代三十六个兵法策略，语源于南北朝，成书于明清。它是根据我国古代卓越的军事思想和丰富的斗争经验总结而成的兵书，是中华民族悠久文化遗产之一。► 1条名句",
 *		"book_img": "sanshiliuji.jpg",
 *		"book_id": 4,
 *		"book_name": "三十六计"
 *	}
 *	.
 *	.
 *	.
 * ]
 * @apiVersion 1.0.0
 */
router.get('/page/:page/limit/:limit',function (req,res) {
	// body...
	var pageNum = parseInt(req.params.page)
	var limitnum = parseInt(req.params.limit)

	if (isNaN(pageNum)) {
		pageNum = 0
	}

	if (isNaN(limitnum)) {
		limitnum = 10
	}
	var query = {}
	var project = {'book_contents' : 0}
	responseAction('books',query, project,req, res, pageNum, limitnum)
});


/**
 * @api {get} /books/id/:book_id 根据book_id查询古书
 * @apiSampleRequest https://localhost:18081/books/id/:book_id
 * @apiDescription 根据book_id查询古书
 * @apiName 根据book_id查询古书
 * @apiGroup Books
 * @apiParam {Int} book_id 古书id
 * @apiSuccessExample {json} Success-Response:
 * [
 *		{
 *			"_id": "5b9b35f0aaa98b0dfadf42ca",
 *			"book_abstract": "《般若波罗蜜多心经》也称为《摩诃般若波罗蜜多心经》，简称《般若心经》或《心经》，是般若经系列中一部言简义丰、博大精深、提纲挈领、极为重要的经典，为大乘佛教出家及在家佛教徒日常背诵的佛经。现以唐代三藏法师玄奘译本为最流行。",
 *			"book_img": "xinjing.jpg",
 *			"book_id": 152,
 *			"book_name": "心经"
 *		}
 * ]
 * @apiVersion 1.0.0
 */
router.get('/id/:book_id',function(req, res){
	// console.log(req.params.book_id)
	// js 字符串转换数字:https://www.cnblogs.com/carekee/articles/1729574.html
	var query = {
		'book_id' : parseInt(req.params.book_id)
	}
	var project = {}
	responseAction("books",query,project,req, res, 0, 0)
})


/**
 * @api {get} /books/name/:book_name 根据book_name查询古书
 * @apiSampleRequest https://localhost:18081/books/name/:book_name
 * @apiDescription 根据book_name查询古书
 * @apiName 根据book_name查询古书
 * @apiGroup Books
 * @apiParam {String} book_name 古书名字
 * @apiSuccessExample {json} Success-Response:
 * [{
 *		_id: "5b9b35f0aaa98b0dfadf42ca",
 *		book_abstract: "《般若波罗蜜多心经》也称为《摩诃般若波罗蜜多心经》，简称《般若心经》或《心经》，是般若经系列中一部言简义丰、博大精深、提纲挈领、极为重要的经典，为大乘佛教出家及在家佛教徒日常背诵的佛经。现以唐代三藏法师玄奘译本为最流行。",
 *		book_img: "https://img.gushiwen.org/bookPic/xinjing.jpg",
 *		book_id: 152,
 *		book_name: "心经",
 *		book_contents: [{
 *			book_chapter_title: "心经",
 *			book_chapter_section: "",
 *			book_chapter_content: "作者：/n玄奘译/n观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。/n舍利子，色不异空，空不异色，色即是空，空即是色，受想行识亦复如是。/n舍利子，是诸法空相，不生不灭，不垢不净，不增不减。是故空中无色，无受想行识，无眼耳鼻舌身意，无色声香味触法，无眼界乃至无意识界，无无明亦无无明尽，乃至无老死，亦无老死尽，无苦集灭道，无智亦无得。/n以无所得故，菩提萨埵。依般若波罗蜜多故，心无挂碍；无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。/n三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。/n故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。/n故说般若波罗蜜多咒，即说咒曰：揭谛，揭谛！波罗揭谛，波罗僧揭谛，菩提萨婆诃。"
 *		}]
 * }]
 * @apiVersion 1.0.0
 */
router.get('/name/:book_name',function(req, res){
	var query = {
		'book_name' : req.params.book_name
	}
	var project = {}
	responseAction("books",query,project,req, res, 0, 0)
})
module.exports = router;