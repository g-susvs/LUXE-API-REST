const Container = require('../models/container');
const item = require('../models/item');

const existeContainerPorId = async( id )=>{
    const existeContainer = await Container.findById(id);
    if(!existeContainer){//si esto no existe tiro el error
        throw new Error(`El id no existe  ${id}`);
    }
}

const existeItemPorId = async( id )=>{
    const existeItem = await item.findById(id);
    if(!existeItem){//si esto no existe tiro el error
        throw new Error(`El id no existe  ${id}`);
    }
}

module.exports={
    existeContainerPorId,
    existeItemPorId
}