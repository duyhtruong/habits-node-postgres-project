const { response } = require('express');

const Pool = require('pg').Pool
const habitPool = new Pool({
    user: 'me',
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
            throw error
        }else{
            res.status(200).json(results.rows)
        }
    })
    
}

const getAllHabits = (req,res)=>{
    habitPool.query('SELECT * FROM habits ORDER BY id ASC', (err,results)=>{
        if(err){
            return err
        } else{
            return res.send(results.rows);
        }
    })
}

const getHabitByID = (req, res) => {
    res.json({
        info:'This is the individual user habits page'
    })
}

const createHabit = (req, res) => {
    let habitName = req.body.habitName;
    let userid = parseInt(req.params.id);
    
    habitPool.query('INSERT INTO habits (habit_name, user_id) VALUES ($1, $2) RETURNING habit_id', [habitName, userid], 
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
    res.json({
        info:'This is the deleteHabit Page'
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