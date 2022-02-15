const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const User = db.define('User', {
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    uid:{
        type: DataTypes.STRING,
        allowNull: false
    },
    displayName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

module.exports = User