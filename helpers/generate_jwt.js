const jwt = require('jsonwebtoken');

const generateJWT = async (id) =>{
    const payload = {id}

    return new Promise((resolve, reject)=>{
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, 
           {expiresIn: '4h'},
           (err, token)=>{
               if(err){
                   console.log(err);
                   reject(err)
               }else{
                   console.log('Creado el token');
                   resolve(token);
               }
        });
    })
}

module.exports = {
    generateJWT
}