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
        type: Boolean
    },
    date: {
        type: Date
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
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'Category'
        type: String
    },
    owner: {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'User',
        type: String,
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
});
exports.Project = mongoose.model('Project', projectSchema);
