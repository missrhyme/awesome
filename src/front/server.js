// var webpack = require('webpack')
// var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('./webpack.config')
var path = require('path')
var ejs = require('ejs')
var express = require('express')
var engine = require('ejs-mate')

var app = new express()
var port = 2221

app.set('views', path.join(__dirname, '/pages'))
app.engine('.html', engine)
app.set('view engine', 'html')

// var compiler = webpack(config)
app.use('/lib', express.static('lib'))
app.use('/dist', express.static('dist'))
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.render('account/login')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
