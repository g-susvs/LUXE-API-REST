const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Item= require('../models/item');
const Container= require('../models/container');
const User= require('../models/user');

const colectionPermi = [
    'users',
    'containers',
    'items',
    'roles'
];

const searchUsers = async(termino='',res=response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const user = await User.findById(termino);
        return res.json({
            results:(user) ? [user] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const users = await User.find({
        $or: [{name:regex},{email:regex}],
        $and: [{estate:true}]
    }); 

    res.json({
        results: users
    })
}

const searchContainers = async(termino='',res=response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const container = await Container.findById(termino);
        return res.json({
            results:(container) ? [container] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const containers = await Container.find({
        $or: [{name:regex},{estado:true}]
    }); 

    res.json({
        results: containers
    })
}

const searchItems = async(termino='',res=response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const item = await Item.findById(termino);
        return res.json({
            results:(item) ? [item] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const items = await Item.find({
        $or: [{name:regex},{estado:true}]
    }); 

    res.json({
        results: items
    })
}


const buscar = (req,res=response)=>{

    const {coleccion, termino}= req.params;

    if (!colectionPermi.includes(coleccion)) {
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${colectionPermi}`
        })
    }

    switch (coleccion) {
        case 'users':
            searchUsers(termino,res);
        break;

        case 'containers':
            searchContainers(termino,res);
        break;

        case 'items':
            searchItems(termino,res);
        break;
    
        default:
            res.status(500).json({
                msg:'Se le olvido hacer la busqueda'
            })
    }
}

module.exports={
    buscar
}