const express = require('express')
//Modelagem MVC feita pelo módulo express
const router = express.Router()

//com o UserController.js criado e sua classe exportada, agora pode ser requisitado
const UserController = require('../controllers/UserController')

router.post('/add', UserController.createUser)
router.get('/', UserController.showUser)

module.exports = router