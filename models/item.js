const {model, Schema} = require('mongoose');

const ItemSchema = new Schema({
    name:{},
    img_client:{},
    img_store:{},
    date_register:{},
    user:{},
    container:{}
})