"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
});
const applySchema = new mongoose.Schema({
    answer1: {
        type: String
    },
    answer2: {
        type: String
    },
    academic: {
        type: String
    }
});
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
    candidates: {
        type: [applySchema],
        default: []
    }
});
exports.Project = mongoose.model('Project', projectSchema);
