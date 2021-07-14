import { port } from '@config/config'
import loadRoutes from '@libs/load-routes'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { json } from 'express'
import createError from 'http-errors'
import morgan from 'morgan'
import { join } from 'path'

dotenv.config()
const app = express()
app.use(morgan('combined'))
app.use(json())
app.use(cors())
app.use(loadRoutes(join(__dirname, './routes'), true))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({
    error: err.message
  })
})

app.listen(port)
