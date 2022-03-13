// Loading modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin') //importa o admin.js
const path = require('path')
const mongoose = require('mongoose')


//Configs
    //BodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    
    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')
    
    //Mongoose
        // Em breve

    // Public
    app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
    app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
    app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
//Routes
    app.use('/admin', admin) //admin referencia a constante de rotas na linha 6

//others
const PORT = 8082
app.listen(PORT, () =>{
    console.log('Servidor rodando na rota http://localhost:8082')
})