require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const path = require('path')

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(cors())

app.use(require('./libs/load-routes')(
  path.join(__dirname, './routes'),
  true
))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({
    error: err.message
  })
})

app.listen(config.port)
