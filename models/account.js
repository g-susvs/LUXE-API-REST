const { Schema, model } = require('mongoose');

const accountSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    registration_date: {
        type: Date,
        required: true
    },
    plan:{
        type: Number,
        required: true,
    },
    expiration_date:{
        type: Date,
    }
})

module.exports = model('Account', accountSchema)