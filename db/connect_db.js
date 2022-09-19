const mongoose = require('mongoose');

const connectDB = async () => {
   
    mongoose.connect(process.env.MONGO_CNN, { useNewUrlParser: true })
    .then(() =>
        console.log('Base de datos online')
    )
    .catch(err => console.log(err));
        
    
}
module.exports = {connectDB};