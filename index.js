const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const habitDB = require('./habitQueries')
const cors = require("cors")
const { response } = require('express')

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

app.get('/habits', habitDB.getAllHabits)
app.get('/habits/:userid', habitDB.getHabits)
app.get('/habits/:userid/:id', habitDB.getHabitByID)
app.post('/habits/:userid', habitDB.createHabit)
app.put('/habits/:userid/:id', habitDB.updateHabit)
app.delete('/habits/:id', habitDB.updateHabit)

