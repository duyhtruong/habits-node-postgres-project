const { response } = require('express');

const Pool = require('pg').Pool
const habitPool = new Pool({
    user: 'duytruong',
    host:  'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

//GET all habits
const getHabits = (req, res) => {
    let userid = parseInt(req.params.id)

    habitPool.query('SELECT * FROM habits WHERE user_id = $1', [userid], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.status(200).json(results.rows)
        }
    })
    
}



const getAllHabits = (request, response) => {
    habitPool.query('SELECT * FROM habits ORDER BY habit_id ASC', function (error, results){
        if (error){
            throw error;
        }else{
            return response.send(results.rows);
        }
        //return response.status(200).json(results.rows)
        //return response.send({error: false, data: results});
    })
}



const getHabitByID = (req, res) => {
    res.json({
        info:'This is the individual user habits page'
    })
}

const createHabit = (req, res) => {
    let habitName = req.body.habitName;
    //let userid = req.body.userid;
    const id = parseInt(request.params.id)
    
    habitPool.query('INSERT INTO habits (habit_name, user_id) VALUES ($1, $2) RETURNING habit_id', [habitName, id], 
    (error, results)=>{
        if(error){
            throw error;
        }else{
            return res.send({message: 'New Habit Added!'})
        }
    })
}

const updateHabit = (req, res) => {
    res.json({
        info: 'This is the updateHabit page'
    })
}

const deleteHabit = (req, res) => {
    const id = parseInt(req.params.id)

    habitPool.query('DELETE FROM habits WHERE habit_id = $1', [id], function(error, results){
        if(error){
            throw error;
        }else{
            return res.send(`User deleted with ID: ${id}`);
        }
    })
}

module.exports = {
    getHabits,
    getAllHabits,
    getHabitByID,
    createHabit,
    updateHabit,
    deleteHabit,
}