module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin == 1){
            return next()
        }

        else{
            req.flash('error_msg', 'Você precisa estar logado e ser admin para entrar aqui')
            res.redirect('/')
        }
    }
}