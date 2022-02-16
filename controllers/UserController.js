const User = require('../models/User')

//Classe dos métodos controladores
module.exports = class UserController {
    static async createUser(req, res){
        const user = {
            email: req.body.email,
            //método para ober uid interno. 
            uid:(req.body.email.slice(0,5)+req.body.displayName.slice(0,3)).toUpperCase(),
            //uid: req.body.uid, //Utilizando o firebase, por exemplo essa chave seria servida
            displayName: req.body.displayName,
            status: true
        }

        await User.create(user)

        //teste caso não consiga construir user
        if(!user){
            res.status(402).json({ message: 'user-parametros-null' }) //resposta para o programador do front, não para o usuário
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
}