const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next) {
    const headers = req.headers
    if(headers && headers["authorization"]){
        const header = headers["authorization"]
        const token = header.split(" ")[1]
        
        jwt.verify(token, "secret", (err, decoded) => {
            if(err){
                return res.json({
                    error: "Unauthorized"
                })        
            }
            
            req.userID = decoded.userID

            console.log(err);
            console.log(decoded);
        })

        next()
    } else {
        return res.json({
            error: "Unauthorized"
        })
    } 
}

module.exports = {
    verifyJWT
}