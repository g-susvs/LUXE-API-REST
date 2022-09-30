const { response} = require('express');
const Container = require('../models/container')

const getContainers = async(req,res) => {
    
    const query = { estado: true };

    try {
        const [containers, total] = await Promise.all([
            Container.find(query),
            Container.countDocuments(query)
        ])
        res.status(200).json({ total, containers })
        
    } catch (error) {
        console.log(error);
        res.json(error);
    }

}
const getContainer = async(req,res= response) => {
    
    const {id} = req.params;
    const container = await Container.findById(id)
                            .populate('user','name');
    res.json(container);
}
const createContainer = async(req,res= response) => {
    
    const name= req.body.name.toUpperCase();
    const type_container = req.body.type_container.toUpperCase();


    const containerDB = await Container.findOne({name,type_container});

    if (containerDB) {
        return res.status(400).json({
            msg: `El container ${containerDB.name}, ya existe`
        })
    }

    const data ={
        name,
        type_container,
        user: req.user._id,
    }

    const container = new Container(data);

    await container.save();

    res.status(201).json(container);
}
const updateContainer = async(req,res) => {
    const {id} = req.params;
    const {user, ...data} = req.body;

    const container = await Container.findByIdAndUpdate(id, data, {new:true});

    res.json(container);
}
const deleteContainer = async(req,res) => {
    
    const {id} = req.params;

    const container = await Container.findByIdAndUpdate(id,{estado:false},{new:true});
    

    res.json(container)
}

module.exports = {
    getContainer,
    getContainers,
    createContainer,
    updateContainer,
    deleteContainer
}