const { response } = require('express');

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
    pool.query('SELECT * FROM users ORDER BY id ASC', function (error, results){
        if (error){
            throw error;
        }else{
            return response.send(results.rows);
        }
        //return response.status(200).json(results.rows)
        //return response.send({error: false, data: results});
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
/*const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results)=>{
        if(error){
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}*/

const createUser = function (req, res) {
    let name = req.body.name;
    let email = req.body.email;

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email], function(error, results){
        if(error){
            throw error;
        }else{
            return res.send({message: `User added with ID: ${results.rows[0].id}`})
        }
    })
}

//PUT updated data in an existing user
/*
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
}*/

const updateUser = function(req,res){
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const email = req.body.email;

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3',[name, email, id], function(error, results){
        if (error){
            throw error
        }
        else{
            return res.send({message: 'User modified with ID'})
        }
    })
}

//DELETE user
/*
const deleteUser = (request, response)=>{
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}*/
const deleteUser = function(req,res){
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], function(error, results){
        if(error){
            throw error;
        }else{
            return res.send(`User deleted with ID: ${id}`);
        }
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