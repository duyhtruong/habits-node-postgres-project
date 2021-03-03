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
    res.json({
        info:'This is the user habits page'
    })
}

const getHabitByID = (req, res) => {
    res.json({
        info:'This is the individual user habits page'
    })
}

const createHabit = (req, res) => {
    res.json({
        info:'This is the createHabit Page'
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
    getHabitByID,
    createHabit,
    updateHabit,
    deleteHabit,
}