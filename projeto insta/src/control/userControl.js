var User = require('../model/user');
const jwt = require("jsonwebtoken");

exports.getUsers = async function () {
    try {
        return await User.find();

    } catch (err) {
        console.log(err);
    }
}

exports.createUser = async function (user) {
    try {
        var validation;
        const userExists = await User.findOne({ email: user.email });
        if (userExists) {
            return validation = "O email informado já existe!";
        }
    
        if (validation) {
            return validation;
        }

        return await User.create(user);
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

exports.login = async function (email, password) {
    try {
        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return "Usuário não encontrado!";
        }
        const token = jwt.sign({ id: user._id, name: user.name, lastName: user.lastName, email: user.email, phone: user.phone, permission: user.permission }, process.env.SECRET, {
            expiresIn: 86400,
        });
        return token;
    } catch (err) {
        console.log(err);
    }
}