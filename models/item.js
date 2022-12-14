const {model, Schema} = require('mongoose');

const ItemSchema = new Schema({
    name:{
        type: String,
        required: [true,'Name is required'],
        unique:true
    },
    description:{
        type: String,
        required: [true,'Name is required'],
    },
    img_client:{
        type: String,
        default:""
    },
    img_store:{
        type: String,
        default:""
    },
    state:{
        type: Boolean,
        default: true,
    },
    date_register:{
        type: Date
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    container:{
        type:Schema.Types.ObjectId,
        ref: 'Container',
        required: true
    }
})

ItemSchema.methods.toJSON = function(){
    const { __v,state, ...data } = this.toObject();//quitar __v del paginado | data muestra

    return data;
}

module.exports = model('Item',ItemSchema)