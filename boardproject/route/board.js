/**
 * http://usejsdoc.org/
 */

var express = require('express');
var router = express.Router();
var multer = require('multer');
var dao = require('../dao/boarddao');

var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, './uploads')
	  },
	  filename: function (req, file, cb) {
		  var oname = file.originalname;
		  var idx = oname.lastIndexOf('.');
		  var fname = oname.substring(0, idx) + '_' + Date.now() + oname.substring(idx);
	    cb(null, fname);
	  }
	});
	 
	var upload = multer({ storage: storage });


	
	//쓰기 post, enctype

router.post('/write', upload.single('img'), function(req, res){
	var obj = {}
	obj.writer = req.body.writer;
	obj.title = req.body.title;
	obj.content = req.body.content;
//	obj.ip = req.body.ip;
//	obj.idate = req.body.idate;
	obj.img = 'no.png';
	if(req.file){
		obj.img = req.file.filename;
	}
	obj.ip = req.ip;
	console.dir(obj);
	dao.boardInsert(obj, function(state){
		var obj ={};
		obj.state = state? "실패" : "성공";
		res.json(obj);
	});
});


//한개읽기
router.get('/read/:num', (req, res) => {
	var num = req.params.num;
	dao.getBoard(num, function(err, boards){
		var obj = {};
		obj.state = err? "실패" : "성공";
		obj.data = (boards.length == 1 ? boards[0] : {});
		res.json(obj);
	});
});
//전체읽기
router.get('/list', (req, res) => {
	dao.getBoardList(function(err, boards){
		var obj = {};
		obj.state = err? "실패" : "성공";
		if(boards){
			obj.size = boards.length;
			obj.imgbaseurl = '/images/';
			obj.boardList = boards;
		}
		res.json(obj);
	});
});


router.get('/test', function(req, res){
	res.send('test');
});


module.exports = router;