const userModel = require("../model/user")
const jwt = require("jsonwebtoken")

function createUser(req, res) {
    const {email, password} = req.body

    if(!email){
        return res.json({
            error: "Email parameter is required"
        })
    }

    if(!password){
        return res.json({
            error: "Password parameter is required"
        })
    }

    userModel.findOne({email}).then(user => {
        if(user){
            return res.json({
                error: `User with email ${email} already exists`
            })
        } else {
            User = new userModel({email, password})

            User.save()
            .then(user => {
                console.log(user);
                res.json(user)
            })
            .catch(err => {
                console.log(err);
                res.json({
                    error: err
                })
            })
        }
    }).catch(err => {
        return res.json({
            error: err
        })
    })

}

function authUser(req, res) {
    const {email, password} = req.body

    userModel.findOne({email, password}).then(user => {
        if(user){
            token = jwt.sign({userID: user._id}, "secret")
            return res.json({
                token
            })
        } else {
            return res.json({
                error: "User with these credentials not found"
            })
        }
    }).catch(err => {
        return res.json({
            error: err
        })
    })
}

module.exports = {
    createUser,
    authUser
}