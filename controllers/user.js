const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req=request, res = response) => {

    const query = { state: true };
    const {limit=10, from=1} = req.query;
    try {
        const [users, total] = await Promise.all([
            User.find(query)
            .skip(Number(from))
            .limit(Number(limit)),
            User.countDocuments(query)
        ])
        res.status(200).json({ total, users })
        
    } catch (error) {
        console.log(error);
        res.json(error);
    }
    
}

const getUser = async (req, res = response) => {
    
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user.state)throw {msg:'El usuario esta eliminado'};
        
        res.status(200).json(user)
    }catch (error) {
        console.log(error);
        res.json(error);
    
    }

}

const createUser = async (req = request, res = response) => {

    const { name, email, password, role } = req.body;
    
    const user = new User({ name, email, password, role });
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    
    await user.save();
    
    res.status(200).json({
        msg: "Te has registrado",
        user
    });
}

const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, email, role, ...rest } = req.body;

    if(rest.password){
        const salt = bcrypt.genSaltSync(10);
        rest.password = bcrypt.hashSync(rest.password, salt);
    }
    
    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.status(200).json(user);
}

const deleteUser = async (req, res = response) => {
    const { id } = req.params;
   
    await User.findByIdAndUpdate(id, { state: false }, { new: true });
    res.status(200).json({
        msg: 'Usuario eliminado',
        
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}