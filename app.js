var fs = require('fs');
var http = require('http');
var dt = require('date-and-time');

const express = require('express');
const bodyParser = require('body-parser');
var Cookies = require('cookies');
const cookieParser = require('cookie-parser');
const cfg = require('./config');
var cookieKey = [`'${cfg.cookieKey}'`];
const {capitalCase} = require('change-case');



const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



app.get('/', async (req, res) => {
  res.render('index.html');
});

app.use('*',(req, res, next) => {
  const err = new Error(`Bummer, the page: "${req.baseUrl}" is gone. Just up and left!!`);
  err.status = 404;
  next(err);
})

app.use('/err', (req, res, next) => {
  const err = new Error('That server blowed up real good!! We got problems boss.');
  err.status = 500;
  next(err);
})

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
//      console.error(req.url);
//      console.dir(err);
    if (err.status == 404) {
      res.status(404)
      res.render('page-404.html');
      res.render('page-404.html', {title:'404: Internal Server Error'});
    } else {
      res.status(500)
      err.status = 500;
      res.render('page-500.html', {title:'500: Internal Server Error', error: err});
    }
})

var httpServer = http.createServer(app);

httpServer.listen(cfg.port, () => {
  console.log(`The http server is running on port: ${cfg.port}`);
});
