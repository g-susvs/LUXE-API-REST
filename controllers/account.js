const { request } = require("express");
const { Account } = require("../models");
const user = require("../models/user");

const createAccount = async (req = request, res) => {

    const { id } = req.user;
    const { registration_date, plan = '', rental_price } = req.body

    try {

        const accountExist = await Account.findOne({ user: id });
        if (accountExist) {
            return res.status(400).json({
                msg: 'Ya tienes una cuenta'
            })
        }

        const now = new Date(registration_date);

        let planTime;

        if (plan.toUpperCase() == "MENSUAL") planTime = 1000 * 60 * 60 * 24 * 30;
        if (plan.toUpperCase() == "ANUAL") planTime = 1000 * 60 * 60 * 24 * 30 * 12;

        const expiration_date = new Date(now.getTime() + planTime).getTime();

        const data = {
            user: id,
            registration_date,
            plan: plan.toUpperCase(),
            rental_price,
            expiration_date
        };
        const account = new Account(data);

        console.log(data)
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
    const { id } = req.user;

    res.status(200).json({
        id,
        msg: 'account status'
    })
}

module.exports = {
    accountStatus,
    createAccount
}