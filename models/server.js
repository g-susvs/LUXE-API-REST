const path = require('path');
const express = require('express');
const cors = require('cors');
const {connectDB} = require('../db/connect_db');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.dbConnect()
        this.middlewares();
        this.routes()
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }
    async dbConnect(){
        await connectDB();
    }
    routes(){
        this.app.use('/api/users',require('../routes/user'));
        this.app.use('/api/auth',require('../routes/auth'));
        this.app.use('/api/containers',require('../routes/container'));
        
        this.app.get('/*',(req,res)=>{
            const pathFile = path.join(__dirname + '/../public/404.html')
            res.sendFile( pathFile);
        })
    }

    listen(){
        this.app.listen(this.port, ()=>console.log(`http://localhost:${this.port}` ) );
    }
} 
module.exports = Server;