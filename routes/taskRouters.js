const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

router.post('/add', TaskController.createTask)
router.get('/:id', TaskController.showTasks)
router.get('/edit/:id', TaskController.listUpdateTask)
router.post('/edit', TaskController.sendUpdateTask)
router.post('/remove', TaskController.removeTask)

module.exports = router