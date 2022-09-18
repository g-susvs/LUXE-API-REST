const { json } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req=request, res, next) => {

    const token = req.header("x-token");

    if(!token){
        return res.status(404).json({
            msg:"jWT - no hay token en la petición"
        })
    }
    
    const {id} =  jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, decoded)=>{
        if(err){
            
            return res.status(400).json({
                msg:'El token no es valido',
                err
            });
        }
        return decoded;
    });
    
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({
            msg:"jWT - Usuario no existe"
        })
    }
    if(!user.state){
        return res.status(404).json({
            msg:"JWT - Usuario eliminado"
        })
    }

    req.user = user;
    
    next();

}

module.exports = {validateJWT};