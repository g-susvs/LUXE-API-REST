const User = require("../models/user")

const emailExists = async (email) => {
    const user = await User.findOne({email});
    if(user){
        throw `El email ${email} ya está registrado`;
    }
}

const customValidPassword = async (password) => {
    if(!password) return;

    if(password.length < 6) throw `La contraseña debe tener minimo 6 caracteres`;
}

const isAdminRole = async (req, res, next) => {
    const {user} = req;
    if(user.role != 'ADMIN_ROLE'){
        return res.status(400).json({
            msg:'Rol del usuario no es valido'
        })
    }
    next();
}

const isPhoneValid = async (phone) => {
    if(!phone) return;
    
    let phoneString = String(phone);

    if(phoneString[0] != 9) throw `Error - El teléfono debe empezar con 9`

    if(phoneString.length != 9) throw `Error - El teléfono debe tener 9 digitos`;
}

const isDNIValid = async (dni) => {
    if(!dni) return;
    
    let dniString = String(dni);
    
    if(dniString.length != 8) throw `Error - El DNI debe tener 8 digitos`;
}

const isRUCValid = async (ruc) => {
    if(!ruc) return;
    
    let rucString = String(ruc);
    
    if(rucString.length != 11) throw `Error - El RUC debe tener 11 digitos`;
}

const isValidCollection = (collection) =>{
    const collections = ['users', 'container', 'items'];
    if(!collections.includes(collection)){
        throw new Error(`La colección ${collection} no es valida`);
    }
    return true;

}
const validFormDataFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        // const file = req.files.file;
        // console.log(file);
        return res.status(400).json({msg:"No viene imagen en la petición"});
    }

    next();
}

module.exports = {
    emailExists,
    customValidPassword,
    isAdminRole,
    isPhoneValid,
    isDNIValid,
    isRUCValid,
    validFormDataFile,
    isValidCollection
}