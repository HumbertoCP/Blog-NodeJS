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

require('./models/Postagem')
const Postagem = mongoose.model('postagens')


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
        Postagem.find().lean().populate('categoria').sort({data: 'desc'}).then((postagens) => {
            res.render('index', {postagens: postagens})
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno')
            res.redirect('/404')
        })
        
    })

    app.get('/postagem/:slug', (req, res) => {
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
            if(postagem){
                res.render('postagem/index', {postagem: postagem})
            }
            else{
                req.flash('error_msg', 'Esta postagem não existe')
                res.redirect('/')
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno')
            res.redirect('/')
        })
    })

    app.get('/404', (req, res) => {
        res.send('Erro 404')
    })

    app.use('/admin', admin) //admin referencia a constante de rotas na linha 6

//others
const PORT = 8082
app.listen(PORT, () =>{
    console.log('Servidor rodando na rota http://localhost:8082')
})