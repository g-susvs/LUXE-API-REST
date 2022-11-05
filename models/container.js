const {model, Schema} = require('mongoose');

const ContainerSchema = new Schema({
    name:{
        type: String,
        required: [true,'Name is required'],
        unique: true
    },
    name_by_user:{
        type: String,
        default:""
    },
    nro_items:{
        type:Number,
        default:0
    },
    maximum_space:{
        type:Number,
        default:0
    },
    type_container:{
        type: String,
        required: [true,'Type container is required']
    },
    rental:{
        type: Number,
        require: true
    },
    assign_user:{
        type: Schema.Types.ObjectId || null,
        ref: 'User',
        default: null
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state:{
        type: Boolean,
        default: true,
    },
});

ContainerSchema.methods.toJSON = function(){
    const { __v,state, ...data } = this.toObject();//quitar __v del paginado | data muestra

    return data;
}

module.exports= model('Container',ContainerSchema,'container')