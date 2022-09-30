const { response } = require("express");
const Item = require("../models/item");

const getItems = async(req,res= response) => {

    const {limite = 0 , desde = 0} = req.query;
    const query = {estado:true};

    const [total, items] = await Promise.all([
        Item.countDocuments(query),
        Item.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate("user","name")
        .populate("container","name")
    ])
    res.json({
        total,
        items,
    })
}

const getItem = async(req,res=response) => {

    const {id} = req.params;
    const item = await Item.findById(id)
                            .populate('user','name')
                            .populate('container','name');

    res.json(item);
}

const postItems = async(req,res=response) => {
    
    const {estado, user, ...body} = req.body;

    const itemDB = await Item.findOne({name: body.name});

    if (itemDB) {
        return res.status(400).json({
            msg: `El Item ${itemDB.name}, ya existe`
        });
    }

    //geenrar la data a guardar
    const data={
        ...body,
        name : body.name.toUpperCase(),
        user: req.user._id
    }

    const item = new Item(data);

    //Guardar en DB
    await item.save();

    res.status(201).json(item);
}

const putItems = async(req,res=response) => {

    const{id}= req.params;
    const{ estado, user, ...data} =req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const item = await Item.findByIdAndUpdate(id, data, {new:true});

    res.json({
        item
    })
}

const deleteItems = async(req,res=response) => {

    const {id} = req.params;

    const itemBorrado = await Item.findByIdAndUpdate(id,{estado:false},{new:true});
    // const categoriaAutenticado = req.usuario;

    res.json(itemBorrado)
}

module.exports={
    getItems,
    postItems,
    putItems,
    deleteItems,
    getItem
}