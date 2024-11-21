<<<<<<< HEAD
const {Schema,model}=require('mongoose')

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    avatar:{type:String},
    posts:{type:Number,default:0},
    likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    commentPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

module.exports = model('User',userSchema);
=======
const {Schema,model}=require('mongoose')

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    avatar:{type:String},
    posts:{type:Number,default:0},
})

module.exports = model('User',userSchema);
>>>>>>> 8e56e10c44ed715152572326d6bfe6ee3e1ca8fe
