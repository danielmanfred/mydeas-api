import { Project } from './../projects/projects.model';
import * as mongoose from 'mongoose'

export interface User extends mongoose.Document {
    name: string,
    email: string,
    gender: string,
    password: string,
    pic: string,
    dateRegister: Date,
    projects: [mongoose.Types.ObjectId] | Project[],
    address: {
        city: string,
        state: string,
        country: string
    }
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
        required: false
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: []  
    }],
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

export const User = mongoose.model<User>('User', userSchema)