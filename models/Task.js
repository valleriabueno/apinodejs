const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = require('./User')

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
})

User.hasMany(Task)
Task.belongsTo(User)

module.exports = Task