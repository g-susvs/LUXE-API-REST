const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    registration_date: {
        type: Number,
        required: true
    },
    plan:{
        type: String,
        required: true,
    },
    rental_price:{
        type: Number,
        required: true,

    },
    expiration_date:{
        type: Number,
        required: true
    }
})
accountSchema.methods.toJSON = function(){
    const {__v,...rest} = this.toObject();
    return rest;
}
module.exports = model('Account', accountSchema)