/**
 * http://usejsdoc.org/
 */

var mysql = require('mysql');

var dao = function(){
	
};

dao.prototype.boardInsert = function(obj, cb){
	var connection = mysql.createConnection({
		  host     : '192.168.205.185',
		  user     : 'root',
		  password : '1234',
		  database : 'thope'
		});
		 
	connection.connect();
	var sql = 'insert into board(writer, title, content, ip, img) VALUES(?, ?, ?, ?, ?)';
	connection.query(sql, [obj.writer, obj.title, obj.content, obj.ip, obj.img], function (error, results, fields) {
		connection.end();
		var state = 0;
		if (error){
			console.log(error);
			cb(state);
			return;
		}
		state = results.affectedRows;
		console.log('The solution is: ', results.affectedRows);
		cb(state);
	});
};


//한개 읽기
dao.prototype.getBoard = function(num, cb){
	var connection = mysql.createConnection({
		  host     : '192.168.205.185',
		  user     : 'root',
		  password : '1234',
		  database : 'thope'
		});
		 
	connection.connect();
	var sql = 'select * from board where num = ?;';
	connection.query(sql, [num], function (error, results, fields) {
		connection.end();
		if(error){
			console.log(error);
		}
		cb(error, results);
	});
};

//전체읽기
dao.prototype.getBoardList = function(cb){
	var connection = mysql.createConnection({
		  host     : '192.168.205.185',
		  user     : 'root',
		  password : '1234',
		  database : 'thope'
		});
		 
	connection.connect();
	var sql = 'select * from board order by num desc;';
	connection.query(sql, function (error, results, fields) {
		connection.end();
		if(error){
			console.log(error);
		}
		cb(error, results);
	});
};

module.exports = new dao();

