const User = require("../models/user")

const emailExists = async (email) => {
    const user = await User.findOne({email});
    if(user){
        throw `El email ${email} ya está registrado`;
    }
}

const customValidPassword = async (password) => {
    if(password){
        if(password.length < 6) throw `La contraseña debe tener minimo 6 caracteres`;
    }
}

const isAdminRole = async (req, res, next) => {
    const {user} = req;
    // const user = await User.findById(id);
    if(user.role != 'ADMIN_ROLE'){
        return res.status(400).json({
            msg:'Rol del usuario no es valido'
        })
    }
    next();
}

module.exports = {
    emailExists,
    customValidPassword,
    isAdminRole
}