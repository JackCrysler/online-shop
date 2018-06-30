const express = require('express');
const apilist = require('./apilist');
const bodyParser = require('body-parser');
const path = require('path')
let app = express();

const ejs = require('ejs')
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static(path.resolve(process.cwd()+'/../')))

app.use(bodyParser.json())

app.all('*',function(req,res,next){
  res.header({
      'Access-Control-Allow-Origin':'*',//cors
      "Access-Control-Allow-Headers": 'Content-Type, Authorization'//支持多个请求头时，空格隔开
  })
  next()
})


apilist(app)

app.listen('3000',function(){
  console.log('server start at:3000')
})