const Task = require('../models/Task')
const User = require('../models/User')

module.exports = class TaskController{
    static async createTask(req, res){
        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false,
            UserId: req.body.UserId //id do usuário que está ligado à tarefa
        }

        //SEMPRE VALIDAR A EXISTÊNCIA DA CLASSE FORTE
        //validar o relacionamento, porque se não existir um usuário, não pode existir uma task desamparada
        const user = await User.findOne({ where: {id: task.UserId} })
        if(!user){
            res.status(401).json({ message: `tarefa-invalida-usuário-${task.UserId}-sem registro` })
            return
        }

        await Task.create(task)

        res.status(201).json({ message: `tarefa-${task.title}-criada` })
    }

    static async showTasks(req, res){
        const id = req.params.id //req.params.id pressupõe que o front irá tratar a exibição das tarefas como um evento de click, dando início à busca pelo usuário.
       
        //Filtrar tarefas por usuário e depois listar apenas as tarefas desse usuário
        const user = await User.findOne({ include: Task, where: {id:id} }) //SELECT dentro de SELECT

        if(!user){
            res.status(401).json({ message: 'tarefas-invalidas-usuario' })
            return
        }

        res.status(201).json({ user: user.get({ plain: true }) })
    }

    static async listUpdateTask(req, res){
        const id = req.params.id

        const task = await Task.findOne({ where: {id: id} })

        if(!task){
            res.status(402).json({ message: 'tarefa-parametro-nulo' })
            return
        }

        res.status(200).json(task)
    }

    static async sendUpdateTask(req, res){
        const id = req.body.id

        const task = {
            title: req.body.title,
            description: req.body.description,
            done: req.body.done,
            UserId: req.body.UserId
        }

        const user = await User.findOne({ where: {id: task.UserId} })

        if(!user){
            res.status(401).json({ message: `tarefa-invalida-usuário-${task.UserId}` })
            return
        }

        await Task.update(task, { where: {id:id} })

        res.status(200).json(task)
    }

    static async removeTask(req, res){
        const id = req.body.id //id da tarefa
        if(!id){ //aqui verifica se o id, por algum motivo, não chegou... é nulo
            res.status(401).json({ message: `tarefa-parametro-nulo-remocao` })
            return
        }

        const task = await Task.findOne({ where: {id:id} })
        if(!task){ //aqui verifica se o id, que foi preenchido, bate com a verificação de task
            res.status(402).json({ message: `tarefa-inexistente-banco` })
            return
        }

        const user = await User.findOne({ where: {id: task.UserId} })
        if(!user){ //aqui verifica se a tarefa pertence ao usuário, para não deletar tarefa que não esteja relacionada (dupla checagem, por garantia)
            res.status(401).json({ message: `tarefa-${task.title}-fora-usuario` })
            return
        }
        
        await Task.destroy({ where: {id:id} })

        res.status(200).json({ message: `tarefa-${id}-removida-banco` })
    }
}