const { Account } = require("../models");
const user = require("../models/user");

const createAccount = async (req, res) => {

    const {id} = req.params;
    // const {id} = req.user;
    const {registration_date, plan} = req.body;

    try {
        const data = {
            user: id,
            registration_date,
            plan
        };
    
        const account = new Account(data);
        
        await account.save();
    
        res.status(200).json({
            msg: 'create account',
            account
        })
        
    } catch (error) {
        console.log(error);
        res.json(error);
    }
}

const accountStatus = async (req, res) => {
    const {id} = req.user;
    
    res.status(200).json({
        id,
        msg: 'account status'
    })
}


module.exports = {
    accountStatus,
    createAccount
}