const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generate_jwt');
const { Account } = require('../models');
const User = require('../models/user');

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: 'El email aún no esta registrado' });

    if (!user.state) return res.status(404).json({ msg: 'El usuario está eliminado' });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) return res.status(400).json({ msg: 'La contraseña no es correcta' });

    const token = await generateJWT(user.id);

    // validar si tiene una cuenta - solo para usuarios comunes
    // if(user.role != 'ADMIN_ROLE'){

        const accountExist = await Account.findOne({ user: user.id });

        if (!accountExist) {
            return res.status(400).json({
                msg: 'No tienes cuenta',
                token
            })
        }
    // }

    res.status(200).json({
        token,
        msg: 'Bienvenido'
    })
}

const renovateJWToken = async (req = request, res) => {

    const user = req.user;

    const token = await generateJWT(user._id);

    res.status(200).json({
        user,
        token
    }
    )
}

module.exports = {
    login,
    renovateJWToken
}