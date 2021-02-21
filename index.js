const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const cors = require("cors")

app.use(cors())
//body-parser simplifies request by parsing the raw request body and giving you req.body
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true,
  })
)

//route looks for a GET request on root /, then returns some JSON
app.get('/', (request,response)=>{
  response.json({info:'Node.js, Express, and Postgres API'})
})

app.listen(port,()=>{
  console.log(`App running on port ${port}.`)
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

