const mongoose = require("mongoose")

const Favorite = mongoose.model('Favorite', {
    userID: String,
    gistID: String
})

module.exports = Favorite