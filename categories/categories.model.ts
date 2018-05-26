import * as mongoose from 'mongoose'

export interface Category extends mongoose.Document {
    name: string
}

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    }
})

export const Category = mongoose.model<Category>('Category', categorySchema)