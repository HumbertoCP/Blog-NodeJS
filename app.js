// Loading modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin') //importa o admin.js
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')


//Configs
    //session
        app.use(session({
            secret: 'cursodenode',
            resave: true,
            saveUninitialized: true
        }));
        app.use(flash())
        
    // Middleware
        app.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()
        })
    //BodyParser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    
    //Handlebars
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }))
        app.set('view engine', 'handlebars')
    
    //Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blogapp').then(() =>{
            console.log('Conected to the database! ')
        }).catch((error) =>{
            console.log('Error when connecting to the database ')
        })

    // Public
    app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
    app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
    app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

/*     app.use((req, res, next) =>{ //middleware
        console.log("OI EU SOU UM MIDDLEWARE!")
        next()
    }) */
//Routes
    app.get('/', (req, res) => {
        res.render('index')
    })

    app.use('/admin', admin) //admin referencia a constante de rotas na linha 6

//others
const PORT = 8082
app.listen(PORT, () =>{
    console.log('Servidor rodando na rota http://localhost:8082')
})