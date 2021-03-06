const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const app = express()
const routes = require('./routes')
const socketEvents = require('./socket')
const { port, mongoURI } = require('./config')
mongoose.connect(mongoURI, { useNewUrlParser: true })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors())
app.use('/api', routes)

const server = app.listen(port, () => console.log(`Server started on port ${port}`))
const socket = require('socket.io')(server)
socketEvents(socket)
