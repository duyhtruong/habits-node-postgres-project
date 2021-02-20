const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

//GET all users
const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//GET single user by ID
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

//POST a new user
const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results)=>{
        if(error){
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

//PUT updated data in an existing user
const updateUser = (request, response)=>{
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error){
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

//DELETE user
const deleteUser = (request, response)=>{
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

//export functions by creating an object of functions that can be accessed by index.js
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}