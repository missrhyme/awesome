var express = require('express')
var app = new express()
var port = 8080

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post("/amzdefend/services/withsell/list.sj", function(req, res) {
  res.send(JSON.stringify({
    success:true,
    data:{
      total: 200,
      list: [{
        shopId: 1,
        name: 'AA',
        oldprice:300,
        withsellprice: 280,
        withselltime:'2017-04-27',
        status:1
      }]
    }
  }));
});

app.post("/amzdefend/services/shop/list.sj", function(req, res) {
  res.send(JSON.stringify({
    success:true,
    data:{
      total: 200,
      list: [{
        shopId: 1,
        name: 'AA',
        auth: 1,
        status:1
      }]
    }
  }));
});

//短信
app.post("/amzdefend/services/smstemplate/list.sj", function(req, res) {
  res.send(JSON.stringify({
    success:true,
    data:{
      total: 200,
      list: [{
        id: 1,
        name: 'AA',
        content: 'xx'
      }]
    }
  }));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
