import { User } from './../users/users.model';
import * as mongoose from 'mongoose'

export interface News extends mongoose.Document {
    title: string,
    content: string,
    isPrivate: boolean,
    dateRegister: Date
}

export interface Project extends mongoose.Document {
    name: string,
    description: string,
    dateRegister: Date,
    logo: string,
    isActive: boolean
    news: News[],
    owner: User,
    partners: User[],
    candidates: User[]
}

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    content: {
        type: String
    },
    isPrivate: {
        type: Boolean
    },
    dateRegister: {
        type: Date
    }
})

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dataRegister: {
        type: Date,
        required: false
    },
    logo: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    news: {
        type: [newsSchema],
        required: false,
        select: false,
        default: []
    }
    /*owner: {
        type: userSchema,
        required: true
    },
    partners: {
        type: [userSchema],
        required: false,
        default: []
    }*/
})

export const Project = mongoose.model<Project>('Project', projectSchema)    