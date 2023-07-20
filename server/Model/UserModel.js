const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName: {
        type: 'string',
        require: [true, 'please enter a first name']
    },
    middleName: {
        type: 'string'
    },
    lastName: {
        type: 'string',
        require: [true, 'please enter a last name']
    },
    userName: {
        type: 'string',
        require: [true, 'please enter a username']
    },
    email: {
        type: 'string',
        require: [true, 'please enter a email ']
    },
    password: {
        type: 'string',
        require: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
    },
    address: {
        type: 'string',
        require: [true, 'please enter your address']
    },
    city: {
        type: 'string',
        require: [true, 'please enter your city']
    },
    state: {
        type: 'string',
        require: [true, 'please enter your state']
    },
    role: {
        type: String,
        default: "user",
    },
    profilePic: {
        type: String,
        default: 'download-1689681583693-456600974.png'
      },      
    userName: {
        type: String,
    },
    freeQzeto: {
        type: Number,
        default:3
    },
    realQzeto: {
        type: Number,
        default:0
    },
    bounsQzeto: {
        type: Number,
        default:3
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },

})


// hash password

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// // jwt token 
userSchema.methods.getJwtToken = function () {
    try {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE
        });
    } catch (error) {
        // Handle the error appropriately, such as logging or throwing a custom error
        console.error('Error generating JWT token:', error);
        throw new Error('Failed to generate JWT token.');
    }
};
// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);