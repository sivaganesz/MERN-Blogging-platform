// const { Schema, model } = require('mongoose')

// const postSchema = new Schema({
//     title: { type: String, required: true },
//     category: { type: String, enum: ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"], message: "{VALUE is not supported" },
//     description: { type: String, required: true },
//     creator: { type: Schema.Types.ObjectId, ref: "User" },
//     thumbnail: { type: String, required: true },
// }, { timestamps: true })

// module.exports = model('Post', postSchema)
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, enum: ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"], message: "{VALUE is not supported" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array of user IDs
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // Array of user IDs
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;


