import { Project } from './projects.model'

exports.getApply = async (query) => {
    var res = await Project.find(query)
    return res
}

exports.addApply = async (query, update) => {
    await Project.updateOne(query, update)
}

exports.getBySlug = async (slug) => {
    const res = await Project.findOne({ slug: slug })
    return res
}