var express = require('express')
var router = express.Router()

router.get('/',function (req,res) {
	// body...
	res.send('sentences');
});

module.exports = router;