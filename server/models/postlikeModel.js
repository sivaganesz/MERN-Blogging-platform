const {Schema,model}=require('mongoose');

const postlikeModel = new Schema({
    likes: { type: Number, default: 0 }, // Add like count
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Track user IDs who liked the post
}, { timestamps: true })

module.exports = model('postlikeModel',postlikeModel)