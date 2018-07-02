const repository = require('./projects.repository')

exports.getApply = async (req, res, next) => {
    try {
        var data = await repository.getApply()
        res.send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process the request'
        })
    }
} 

exports.addApply = async (req, res, next) => {
    var id = { "_id": req.body.id }
    var update = { $push: {
        apply: {
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        academic: req.body.academic
        }
     } }
    try {
        await repository.addApply(id, update)
        res.send({ message: 'Apply add successfully' })
    } catch (e) {
        res.status(500).send({message: 'Fail to add apply'})
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug)
        res.send(data)
    }
    catch (e) {
        res.status(500).send({ message: 'Fail to process the request' })
    }
}