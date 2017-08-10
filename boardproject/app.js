/**
 * http://usejsdoc.org/
 */
const express = require('express');
const path = require('path');
const errorHandler = require('express-error-handler');
const ejs = require('ejs');
const bodyParser = require('body-parser');


		
const board = require('./route/board');

const app = express();

//app.set('/views', path.join(__dirname, 'views'));
//app.set('/view engine', 'ejs'); 

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public'))); //현재 작업 밑에 있는 퍼블릭폴더!!
app.use('images', express.static(path.join(__dirname, 'uploads')));
//parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());



app.get('/', function (req, res) {
//  res.send('Hello World!')
	res.redirect('/index.html');
});

app.get('/abc', function (req, res) {
  res.send('Hello ' + req.aaa.bbb);
})



app.use('/board', board);

// 500 오류 잡기 
app.use(function (err, req, res, next) {
  console.log(err);
  res.render('500page', { 'msg' : '서버가 바쁩니다.'}); //객체를 전달할 수 있다.
});

//404 오류 잡기
handler = errorHandler({
  static: {
    '404': './public/404page.html'
  }
});


//After all your routes... 
//Pass a 404 into next(err)
app.use( errorHandler.httpError(404) );

//Handle all unhandled errors: 
app.use( handler );

app.listen(80, function () {
  console.log('서버 port 80! 드루와 드루와')
})