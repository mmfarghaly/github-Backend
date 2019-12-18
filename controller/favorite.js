const favoriteModel = require("../model/favorite")
const CircularJSON = require("circular-json")
const axios = require("axios")


function getPublicGits(req, res){
    var {perPage} = req.body

    if(perPage > 3000) {
        return res.json({
            error: "Max results per page is 3000"
        })
    }

    if(!perPage){
        perPage = 100
    }

    axios.get(`https://api.github.com/gists/public?per_page=${perPage}`)
    .then(result => {
        let str = CircularJSON.stringify(result)
        let arr = JSON.parse(str)
        return res.json(arr)
    })
    .catch(err => {
        console.log(err);
        res.json({
            error: err
        })
    })
}

function createFavorite(req, res) {
    const {gistID} = req.body
    if(!gistID){
        return res.json({
            error: "Parameter gistID is required"
        })
    }

    const userID = req.userID

    favoriteModel.findOne({userID, gistID})
    .then(fav => {
        if(fav){
            return res.json({
                error: "Gist has already been added to favorites"
            })
        } else {
            const Fav = new favoriteModel({userID, gistID})

            Fav.save()
            .then(fav => {
                return res.json(fav)
            })
            .catch(err => {
                return res.json({
                    error: err
                })
            })
        }
    })
    .catch(err => {
        return res.json({
            error: err
        })
    })

}

function listFavorites(req, res) {
    favoriteModel.find({userID: req.userID})
    .then(favs => {
        return res.json(favs)
    })
    .catch(err => {
        return res.json({
            error: err
        })
    })
}

module.exports = {
    createFavorite,
    listFavorites,
    getPublicGits
}