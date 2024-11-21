const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const HttpError = require('../models/errorModel')
require('dotenv').config();
const upload = require('express-fileupload')
const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid');

//======= Register A New User=====
//POST : api/users/register
//UNPROTECTED5

const { model } = require("mongoose");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password) {
            return next(new HttpError("Fill in all field", 422));
        }
        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({ email: newEmail })
        if (emailExists) {
            return next(new HttpError("Email already exists"));
        }
        if ((password.trim()).length < 6) {
            return next(new HttpError("Password should be at least 6 characters.", 422));
        }

        if (password != password2) {
            return next(new HttpError("Passwords do not match.", 422))
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPass })
        res.status(201).json(`New User ${newUser.email} registered.`)

    } catch (error) {
        return next(new HttpError("User registration failed", 422));
    }
}






//=======Login a Register=====
//POST : api/users/login
//UNPROTECTED5

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new HttpError('Fill in all fields.', 422));
        }
        const newEmail = email.toLowerCase();

        const user = await User.findOne({ email: newEmail })

        if (!user) {
            return next(new HttpError('Invalid Credentials', 422));
        }
        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(new HttpError('Invalid Password', 422));
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(201).json({ token, id, name })

    } catch (error) {
        return next(new HttpError('Login faild . please check your credentials.', 422));

    }
}




//=======User profile=====
//POST : api/users/:id
//UNPROTECTED5

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password')
        if (!user) {
            return next(new HttpError('User not found', 404));
        }
        res.status(200).json(user)

    } catch (error) {
        return next(new HttpError(error));

    }
}




//======= change User avatar=====
//POST : api/users/change-avatar
//UNPROTECTED5


// const changeAvatar = async (req, res, next) => {
//     try {
//         if (!req.files || !req.files.avatar) {
//             return next(new HttpError('Please choose an image.', 422));
//         }

//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return next(new HttpError('User not found.', 404));
//         }

//         const { avatar } = req.files;

//         if (avatar.size > 500000) {
//             return next(new HttpError('Profile picture too big. Should be less than 500KB', 422));
//         }

//         if (user.avatar) {
//             // Delete old avatar
//             fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
//                 if (err) {
//                     console.error('Error deleting old avatar:', err);
//                 }
//             });
//         }

//         const fileName = `${uuid()}.${avatar.name.split('.').pop()}`;
//         const uploadPath = path.join(__dirname, '..', 'uploads', fileName);

//         // Move the avatar to the uploads directory
//         await avatar.mv(uploadPath);

//         // Update user's avatar in the database
//         const updatedUser = await User.findByIdAndUpdate(req.user.id, { avatar: fileName }, { new: true });

//         if (!updatedUser) {
//             return next(new HttpError("Avatar couldn't be changed.", 422));
//         }

//         res.status(200).json(updatedUser);
//     } catch (error) {
//         console.error('Error changing avatar:', error);
//         return next(new HttpError('Internal server error.', 500));
//     }
// };
const changeAvatar =async (req, res, next) => {
    try{
    if(!req.files.avatar){
        return next(new HttpError('please choose an image.',422))
    }
    //find user from DB
    const user = await User.findById(req.user.id)
    //delete old avatar if exists
    if(user.avatar){
        fs.unlink(path.join(__dirname, '..' , 'uploads', user.avatar),(err)=>{
            if(err){
                return next(new HttpError(err))
            }
        })
    }
    const {avatar}=req.files;
    if(avatar.size > 500000){
        return next(new HttpError('Profile picture too big. Should be less than 500kb'),422)
    }
    let fileName;
    fileName = avatar.name;
    let splittedFilename = fileName.split('.')
    let newFilename = splittedFilename[0]+ uuid() + '.' + splittedFilename[splittedFilename.length-1]
    avatar.mv(path.join(__dirname, '..' , 'uploads' , newFilename), async (err) =>{
        if(err){
            return next(new HttpError(err));
        }
        const updatedAvatar = await User.findByIdAndUpdate(req.user.id, {avatar:newFilename}, {new: true})
        if(!updatedAvatar){
            return next(new HttpError("Avatar couldn't ne changed.",422))
        }
        res.status(200).json(updatedAvatar)
    })
    }catch(error){
        return next(new HttpError(error))
    }
    }



//======= edit User=====
//POST : api/users/register
//UNPROTECTED5

const editUser =async (req, res, next) => {
    try{
const {name, email, currentPassword ,newPassword, confirmNewPassword}=req.body;
if(!name || !email || !currentPassword || !newPassword) {
    return next(new HttpError("Fill the all fields",422))
}

//get user from database
const user = await User.findById(req.user.id);
if(!user){
    return next(new HttpError("User not found",403))

}

// make  sure new email doesn't already exist

const emailExist = await User.findOne({email})
if(emailExist && (emailExist._id != req.user.id)){
    return next(new HttpError("Email already exist.",422))
}
//compare new password
const validateUserPassword = await bcrypt.compare(currentPassword,user.password)
if(!validateUserPassword){
    return next(new HttpError("Invaild current password.",422))
}

if(newPassword !== confirmNewPassword){
    return next(new HttpError("New password do not match.",422))
}
//hash new password
const salt = await bcrypt.genSalt(10);
const Hash = await bcrypt.hash(newPassword , salt); 
//update user info in database
const newInfo = await User.findByIdAndUpdate(req.user.id, {name,email,password: Hash}, {new:true})
res.status(200).json(newInfo)
    }catch(error){
        return next(new HttpError(error))
    }
}




//======= getAuthors=====
//POST : api/users/authors
//UNPROTECTED5

const getAuthors =async (req, res, next) => {
try{
    const authors = await User.find().select('-password');
    res.json(authors)
}catch(error){
    return next(new HttpError(error))
}
}

module.exports = { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors }




