const Auth = require('../models/authModel')

exports.registerUser = async (req, res) => {
    
    const registerNewUser = new Auth(req.body)
    await registerNewUser.postNewUser()

    try{
        if(registerNewUser.error.length > 0){   
            res.status(422).json(registerNewUser.error)
            return
        }
        res.status(201).json({msg: 'Usuário criado com sucesso'})
        return
    }catch(err){
        console.log(err)
    }
}

exports.loginUser = async (req, res) => {
    const login = new Auth(req.body)
    await login.loginUser()

    try{
        if(login.error.length > 0){
            res.status(422).json(login.error)
            return
        }
        res.status(200).json({msg: 'logado com sucesso', token: login.token})
        return
    }catch(err){
        console.log(err)
    }
}