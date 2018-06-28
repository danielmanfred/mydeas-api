import { Project } from './projects.model'

exports.getApply = async (query) => {
    var res = await Project.find(query)
    return res
}

exports.addApply = async (query, update) => {
    await Project.updateOne(query, update)
}