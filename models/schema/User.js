const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    addresses: {
        type: String,
        required: true,
    },
    userRight: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isLock: {
        type: Boolean,
        required: true,
        default: false,
    },
    image: {
        url: {
            type: String
        },
        cloudinary_id: {
            type: String
        }
    }
});

module.exports = mongoose.model("User", userSchema);