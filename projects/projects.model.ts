import * as mongoose from 'mongoose'

export interface Project extends mongoose.Document {
    name: string,
    description: string,
    dateRegister: Date,
    pic: string,
    //owner: User,
    //partners: User[],
}

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
    pic: {
        type: String
    },
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