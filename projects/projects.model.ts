import { Category } from './../categories/categories.model';
import { User } from './../users/users.model';
import * as mongoose from 'mongoose'

export interface News extends mongoose.Document {
    title: string,
    content: string,
    isPrivate: boolean,
    date: Date
}

export interface Apply extends mongoose.Document {
    answer1: string,
    answer2: string,
    academic: string
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
    apply: Apply[]
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
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const applySchema = new mongoose.Schema({
    answer1: {
        type: String
    },
    answer2: {
        type: String
    }, 
    academic: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
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
        required: true,
        default: Date.now
    },
    logo: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
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
    apply: {
        type: [applySchema],
        default: []
    }
})

projectSchema.methods.findApply = function() {
    return this.model('Apply').find()
}

export const Project = mongoose.model<Project>('Project', projectSchema)    