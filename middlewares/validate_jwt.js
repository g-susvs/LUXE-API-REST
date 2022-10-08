const { json } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res, next) => {

    const token = req.header("x-token");

    if (!token) {
        return res.status(404).json({
            msg: "jWT - no hay token en la petición"
        })
    }

    try {

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                msg: "jWT - Usuario no existe"
            })
        }
        if (!user.state) {
            return res.status(404).json({
                msg: "JWT - Usuario eliminado"
            })
        }

        req.user = user;

        next();
        
    } catch (error) {
        return res.status(401).send('Token no valido')
    }
    
    
}

module.exports = { validateJWT };