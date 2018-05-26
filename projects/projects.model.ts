import { Category } from './../categories/categories.model';
import { User } from './../users/users.model';
import * as mongoose from 'mongoose'

export interface News extends mongoose.Document {
    title: string,
    content: string,
    isPrivate: boolean,
    date: Date
}

export interface Project extends mongoose.Document {
    name: string,
    description: string,
    date: Date,
    logo: string,
    isActive: boolean,
    tags: string[],
    news: News[],
    category: mongoose.Types.ObjectId | Category,
    owner: mongoose.Types.ObjectId | User,
    partners: [mongoose.Types.ObjectId] | User[],
    candidates: [mongoose.Types.ObjectId] | User[]
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
    date: {
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
    data: {
        type: Date,
        required: false
    },
    logo: {
        type: String
    },
    isActive: {
        type: Boolean
    },
    tags: [{
        type: String
    }],
    news: {
        type: [newsSchema],
        required: false,
        select: false,
        default: []
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    partners: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: false,
        default: []
    },
    candidates: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: false,
        default: []
    }
})

export const Project = mongoose.model<Project>('Project', projectSchema)    