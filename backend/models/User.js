const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    studentId: { 
        type: String, 
        required: true 
    },
    
    // Default profile fields
    name: { 
        type: String, 
        default: 'New User' 
    },
    role: { // To distinguish between customer, courier, admin, etc.
        type: String, 
        default: 'customer' 
    },
    profilePicture: { 
        type: String, 
        default: '/assets/default_avatar.png' 
    }
});

module.exports = mongoose.model("User", UserSchema);