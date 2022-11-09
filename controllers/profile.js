const { request } = require("express");
const { Container, Item, Account } = require("../models");

const userProfile = async (req = request, res) => {
    const user = req.user;

    try {
        const [containers, items, account] = await Promise.all([
            Container.find({assign_user: user.id}),
            Item.find({user:user.id}),
            Account.findOne({user: user.id})
        ])
        
        res.status(200).json({
            user,
            account,
            container:{
                total:containers.length,
                containers
            },
            item:{
                total:items.length,
                items,
            }
        })
    } catch (error) {
        res.status(400).json(error)
    }


}

module.exports = {
    userProfile
}