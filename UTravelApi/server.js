// load the modules
const express = require(`express`)
const cors = require(`cors`)
const http = require(`http`)
const path = require(`path`)

//global vars
const PORT = process.env.PORT || 5000

//create the server => use the moduels
let server = express()
server.use(cors())
server.use(express.json({ limit: '50mb' }));


//create static folder with read access
server.use(express.static(__dirname + '/build/'))
server.use('/public', express.static(path.join(__dirname, 'public')))

//router
server.use(`/api/users`, require(`./routes/users`))//V
server.use(`/api/bussines`, require(`./routes/bussinesUsers`))//V
server.use(`/api/cities`, require(`./routes/cities`))//V
server.use(`/api/attractions`, require(`./routes/attractions`))//V
server.use(`/api/reviews`, require(`./routes/reviews`))//V
server.use(`/api/orders`, require(`./routes/orders`))//V
server.use(`/api/item`, require(`./routes/item`))//V
server.use(`/api/home`, require(`./routes/home`))//V

//create the server -> use the http
const httpServer = http.createServer(server)

httpServer.listen(PORT, () => { console.log(`the server is live at http://localhost:${PORT}`) })