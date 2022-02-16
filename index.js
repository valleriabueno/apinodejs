const express = require('express')
const app = express()
const conn = require('./db/conn')

const Task = require('./models/Task')
//Chamada da estrutura do banco de dados em Modelo ORM
const User = require('./models/User')
const userRouters = require('./routes/userRouters')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
//Middleware de rotas de métodos controladores do modelo
app.use('/users', userRouters)


/*Rotas de Exemplo
app.get('/validation/:id', (req, res) => {
    const id = req.params.id

    if(!id) {
        res.status(402).json({ message: 'Parâmetro de ID falho ou desconhecido' })
        return
    }

    if(id>100 && id<200) {
        res.status(200).json({user:'ADM'})
        return
    }else if(id>200) {
        res.status(200).json({user:'OPE'})
        return
    }else {
        res.status(200).json({user:'VST'})
        return
    }
})

app.post('/addproduct', (req, res) => {
    const name = req.body.name
    const price = req.body.price
    const gain = req.body.gain
    const salePrice = (parseFloat(price) * (parseFloat(gain)+1)).toFixed(2)

    // const message = {
    //     header: 'Erro #API32-NAME',
    //     texto: 'Requisição de nome não atendida.'
    // }
    if(!name) {
        res.status(402).json({ message: 'Requisição de nome não atendida.' })
        return //parar o serviço aqui
    }

    if(!price) {
        res.status(402).json({ message: 'Requisição de preço não atendida.' })
        return
    }

    if(!gain) {
        res.status(402).json({ message: 'Requisição de lucro não atendida.' })
        return
    }

    const product = {
        name,
        price,
        gain,
        salePrice
    }

    console.log(product)
    res.status(202).json(product)
})

app.get('/', (req, res) => {
    //status consultado no mdn mozilla (status de resposta HTTP)
    res.status(202).json(
        {
            message: 'Minha primeira API. Que legal, estamos no fim do BCW 9'
        }
    )
})
*/

conn
.sync()
//.sync({force: true}) //FORÇA O RESET DO BANCO DE DADOS. ATENÇÃO
.then(() => {
    app.listen(3000)
})
.catch((err) => console.log())