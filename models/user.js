const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true,'Name is required']
    },
    email:{
        type: String,
        uniq: true,
        required: [true,'Email is required']
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    img:{
        type: String,
        default:""
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        // required: true
    },
    phone:{
        type: Number,
    },
    address:{
        type:String,
        default:""
    },
    DNI:{
        type: Number,
    },
    RUC:{
        type: Number,
    },
    state:{
        type: Boolean,
        default: true
    },
})

UserSchema.methods.toJSON = function(){
    const {__v, password, state,...rest} = this.toObject();
    return rest;
}
module.exports =  model('User', UserSchema,'users');