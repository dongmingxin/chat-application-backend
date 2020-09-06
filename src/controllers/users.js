const { userModel, validate } = require('../models/user');


async function addUser(req, res) { 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ username });
    if (existingUser) return res.status(400).json("Username already exist");

    const user = new userModel({
        username,
        password
    });
    
    await user.save();
    return res.json(user);
}

function deleteUser(req, res) { 

}

async function getUser(req, res) {
    const user = await userModel.find();
    res.json(user)
}

module.exports = {
    addUser,
    getUser,
    deleteUser
}