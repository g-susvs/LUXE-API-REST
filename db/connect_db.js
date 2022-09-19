const mongoose = require('mongoose');

const connectDB = async () => {
    try{

        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },(err) => {
            if (err) throw err;
            console.log('Base de datos ONLINE');
        });
        
    }catch(err){
        console.log(err);
        throw new Error('Error en la base de datos');
    }
}
module.exports = {connectDB};