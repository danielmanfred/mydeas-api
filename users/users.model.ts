import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import { Project } from './../projects/projects.model'
import { environment } from '../common/environment';

export interface User extends mongoose.Document {
    name: string
    email: string
    gender: string
    password: string
    pic: string
    dateRegister: Date
    projects: [mongoose.Types.ObjectId] | Project[]
    profiles: string[]
    address: {
        city: string
        state: string
        country: string
    }

    matches(password: string): boolean
    hasAny(...profiles: string[]): boolean
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>
}

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
        required: false
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
})

userSchema.statics.findByEmail = function(email: string, projection: string) {
    return this.findOne({email}, projection) // {email: email}
}

userSchema.methods.matches = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.hasAny = function(...profiles: string[]): boolean {
    return profiles.some(profile => this.profiles.indexOf(profile) !== -1)
}

const hashPassword = (obj, next) => {
    bcrypt.hash(obj.password, environment.security.saltRounds)
          .then(hash => {
              obj.password = hash
              next()
          })
          .catch(next)
}

const saveMiddleware = function(next) {
    const user: User = this
    if (!user.isModified('password')) {
        next()
    }
    else {
        hashPassword(user, next)
    }
}

const updateMiddleware = function(next) {
    if (!this.getUpdate().password) {
        next()
    }
    else {
        hashPassword(this.getUpdate(), next)
    }
}

userSchema.pre('save', saveMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)
userSchema.pre('update', updateMiddleware)

export const User = mongoose.model<User, UserModel>('User', userSchema)