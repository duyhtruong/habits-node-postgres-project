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

}

const getHabitByID = (req, res) => {

}

const createHabit = (req, res) => {

}

const updateHabit = (req, res) => {

}

const deleteHabit = (req, res) => {

}

module.exports = {
    getHabits,
    getHabitByID,
    createHabit,
    updateHabit,
    deleteHabit,
}