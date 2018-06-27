const repository = require('./projects.repository')

exports.getApply = async (req, res, next) => {
    try {
        var data = await
    } catch (e) {

    }
}

exports.addApply = async (req, res, next) => {
    let data = {
        answer1: req.body.answer1,
        answer2: req.body.answar2,
        academic: req.body.academic
    }
    try {
        await repository.addApply(data)
        res.send({ message: 'Apply add successfully' })
    } catch (e) {
        res.status(500).send({ message: 'Fail to add apply'})
    }
}