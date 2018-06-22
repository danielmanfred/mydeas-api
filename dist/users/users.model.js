"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const environment_1 = require("../common/environment");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    gender: {
        type: String,
        required: false,
        enum: ['F', 'M']
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    pic: {
        type: String
    },
    dateRegister: {
        type: Date,
        required: true,
        default: Date.now
    },
    projects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            default: []
        }],
    profiles: {
        type: [String],
        default: 'user'
    },
    address: {
        city: {
            type: String,
            required: false,
            maxlength: 50
        },
        state: {
            type: String,
            required: false,
            maxlength: 50
        },
        country: {
            type: String,
            required: false,
            maxlength: 50
        }
    }
});
userSchema.statics.findByEmail = function (email, projection) {
    return this.findOne({ email }, projection); // {email: email}
};
userSchema.methods.matches = function (password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.hasAny = function (...profiles) {
    return profiles.some(profile => this.profiles.indexOf(profile) !== -1);
};
const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment_1.environment.security.saltRounds)
        .then(hash => {
        obj.password = hash;
        next();
    })
        .catch(next);
};
const saveMiddleware = function (next) {
    const user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        hashPassword(user, next);
    }
};
const updateMiddleware = function (next) {
    if (!this.getUpdate().password) {
        next();
    }
    else {
        hashPassword(this.getUpdate(), next);
    }
};
userSchema.pre('save', saveMiddleware);
userSchema.pre('findOneAndUpdate', updateMiddleware);
userSchema.pre('update', updateMiddleware);
exports.User = mongoose.model('User', userSchema);
