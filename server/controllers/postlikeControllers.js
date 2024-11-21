const postlikeModel = require('../models/postlikeModel')

const userLike = async (req, res, next) => {
    try {
        const userID = req.params.id;
        if (!userID) {
            return next(new HttpError("User unavailable", 400))
        }
        // const likecount = await 
        // console.log(json.parse(userID));
        
        console.log("haa haa haa");
    
    }catch(error){

    }
}

module.exports = {userLike}

