const { response } = require("express");
const { Container } = require("../models");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Item = require("../models/item");

const getItems = async (req, res = response) => {

    const { limite = 0, desde = 0 } = req.query;
    const query = { state: true };

    try {
        const [total, items] = await Promise.all([
            Item.countDocuments(query),
            Item.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate("user", ["name", "email"])
                .populate("container", ["name", "name_by_user"])
        ])
        res.json({
            total,
            items,
        })
    } catch (error) {
        console.log(error);
        res.json(error);
    }

}

const getItem = async (req, res = response) => {

    const { id } = req.params;

    try {
        const item = await Item.findById(id) // evaluar el state de y demas
            .populate('user', 'name')
            .populate('container', 'name');

        res.json(item);

    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

const postItems = async (req, res = response) => {

    const { id } = req.user;
    const { container } = req.body;

    const containerExist = await Container.findById(container);

    if (!containerExist) {
        return res.status(400).json({
            msg: `No existe contenedor con el id ${container}`
        })
    }

    if (containerExist.assign_user != id) {
        return res.status(403).json({
            msg: `No tiene acceso al contenedor: ${containerExist.name}`
        })
    }

    const { state, user, ...body } = req.body;

    //geenrar la data a guardar
    const data = {
        ...body,
        name: body.name,
        user: req.user._id
    }

    const item = new Item(data);

    //Guardar en DB
    await item.save();

    // incrementar el nro de items del contenedor
    containerExist.nro_items = containerExist.nro_items + 1;
    await containerExist.save();

    res.status(201).json(item);
}

const putItems = async (req, res = response) => {

    const { id } = req.params;
    const { state, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const item = await Item.findByIdAndUpdate(id, data, { new: true });

    res.json({
        item
    })
}

const deleteItems = async (req, res = response) => {

    const { id } = req.params;

    const itemBorrado = await Item.findByIdAndUpdate(id, { state: false }, { new: true });

    // decrementar el nro de items 
    const container = await Container.findById(itemBorrado.container);
    container.nro_items = container.nro_items - 1;
    await container.save();

    res.json({
        msg: "Item eliminado",
        itemBorrado
    })
}
const deleteItemDB = async (req, res = response) => {

    const { id } = req.params;

    const itemBorrado = await Item.findByIdAndDelete(id, { new: true })

    // borrar las imagenes de cloudinary
    if (itemBorrado.img_client) {
        const nameArr = itemBorrado.img_client.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split(".");
        await cloudinary.uploader.destroy(`LUXE/items/${public_id}`);
    }
    if (itemBorrado.img_store) {
        const nameArr = itemBorrado.img_store.split("/");
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split(".");
        await cloudinary.uploader.destroy(`LUXE/items/${public_id}`);
    }

    // decrementar el nro de items 
    const container = await Container.findById(itemBorrado.container);
    container.nro_items = container.nro_items - 1;
    await container.save();

    res.json({
        msg: "Item eliminado",
        itemBorrado
    })
}

module.exports = {
    getItems,
    postItems,
    putItems,
    deleteItems,
    deleteItemDB,
    getItem
}