const User = require('../models/User')

//Classe dos métodos controladores
module.exports = class UserController {
    static async createUser(req, res){
        const user = {
            email: req.body.email,
            displayName: req.body.displayName,
            //método para ober uid interno. 
            uid: (req.body.email.slice(0,5) + req.body.displayName.slice(0,3)).toUpperCase(),
            //uid: req.body.uid, //Utilizando o firebase, por exemplo essa chave seria servida
            status: true
        }

        await User.create(user)

        //teste caso não consiga construir user
        if(!user){
            res.status(402).json({ message: 'user-parametros-nulo' }) //resposta para o programador do front, não para o usuário
            return
        }

        res.status(201).json({ message: `usuario-${user.displayName}-criado` })
    }

    static async showUser(req, res){
        const user = await User.findAll({ raw: true })

        if(!user){
            res.status(402).json({message: 'lista-usuarios-parametro-nulo'})
            return
        }

        res.status(202).json(user)
    }

    static async listUpdateUser(req, res){
        const id = req.params.id

        const user = await User.findOne({ where: {id:id} })

        if(!user){
            res.status(406).json({ message: 'parametro-usuario-inconsistente' })
            return
        }

        res.status(200).json(user)
    }

    static async sendUpdateUser(req, res){
        const id = req.body.id
        
        const user = {
            email: req.body.email,
            displayName: req.body.displayName,
            uid: (req.body.email.slice(0,5) + req.body.displayName.slice(0,3)).toUpperCase(),
            status: req.body.status
        }

        await User.update(user, { where: {id:id} })

        if(!user){
            res.status(402).json({ message: 'user-parametros-nulo' })
            return
        }

        res.status(200).json({ message: `user-${id}-atualizado` })
    }

    static async removeUser(req, res){
        const id = req.body.id

        if(!id){
            res.status(402).json({message:'usuario-id-parametro-nulo'})
            return
        }

        const user = await User.findOne({ where: {id:id} })
        if(!user){ //aqui verifica se o id, que foi preenchido, bate com a verificação de id
            res.status(402).json({ message: `usuario-inexistente-banco` })
            return
        }

        await User.destroy({where: {id:id}})

        res.status(202).json({message:`usuario-${id}-removido`})
    }
}