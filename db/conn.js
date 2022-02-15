const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('apitasks', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

try{
    sequelize.authenticate()
    console.log('Banco de dados conectado via ORM Sequelize')
}catch(err) {
    console.log(`Não foi possível conectar ao banco: ${err}`)
}

module.exports = sequelize