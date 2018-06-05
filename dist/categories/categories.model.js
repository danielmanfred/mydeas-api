"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    }
});
exports.Category = mongoose.model('Category', categorySchema);
