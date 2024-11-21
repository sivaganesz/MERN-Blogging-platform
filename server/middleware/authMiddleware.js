<<<<<<< HEAD
// const jwt = require('jsonwebtoken');
// const HttpError = require('../models/errorModel');
// require('dotenv').config();

// const authMiddleware = async(req,res,next)=>{
//     // const Authorization = req.headers.Authorization || req.headers.authorization;
//     const Authorization = req.headers.authorization || req.headers.Authorization;


//     if(Authorization && Authorization.startsWith("Bearer")){
//         const token = Authorization.split(' ')[1]
//         jwt.verify(token, process.env.JWT_SECRET, (err, info)=>{
//             if(err){
//                 return next(new HttpError('Unauthorized. Invaild token.',403))
//             }
//             req.user=info;
//             next();
//         })
//     }else{
//         return next(new HttpError("Unauthorized No token",402))
//     }
// }


// module.exports = authMiddleware     



const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');
const User = require('../models/userModel'); // Import User model
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    const Authorization = req.headers.authorization || req.headers.Authorization;

    if (Authorization && Authorization.startsWith("Bearer")) {
        const token = Authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, info) => {
            if (err) {
                return next(new HttpError('Unauthorized. Invalid token.', 403));
            }
            try {
                const user = await User.findById(info.id); // Get user details
                if (!user) {
                    return next(new HttpError('Unauthorized. User not found.', 403));
                }
                req.user = user; // Attach user data to request
                next();
            } catch (error) {
                return next(new HttpError('Server error', 500));
            }
        });
    } else {
        return next(new HttpError("Unauthorized. No token", 402));
    }
};

module.exports = authMiddleware;
=======
const jwt = require('jsonwebtoken');
const HttpError = require('../models/errorModel');
require('dotenv').config();

const authMiddleware = async(req,res,next)=>{
    const Authorization = req.headers.Authorization || req.headers.authorization;

    if(Authorization && Authorization.startsWith("Bearer")){
        const token = Authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, info)=>{
            if(err){
                return next(new HttpError('Unauthorized. Invaild token.',403))
            }
            req.user=info;
            next();
        })
    }else{
        return next(new HttpError("Unauthorized No token",402))
    }
}


module.exports = authMiddleware     
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
