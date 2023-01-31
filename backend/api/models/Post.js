import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {
        userId: String,
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
        viewsOf: Number,
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema)

export default Post