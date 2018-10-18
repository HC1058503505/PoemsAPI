const express = require('express')
const router = express.Router()

router.get('/register',function (req, res) {
	// body...
	res.render('register',{'title' : 'register'})
})

router.post('/register',function (req, res)	 {
	// body...
	console.log(req.body);
})

router.get('/info',function (req, res) {
	// body...
	res.send('info page')
})


router.get('/logout',function (req, res) {
	// body...
	res.send('logout page')
})


module.exports = router