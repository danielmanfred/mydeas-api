var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const repository = require('./projects.repository');
exports.getApply = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        var data = yield repository.getApply();
        res.send(data);
    }
    catch (e) {
        res.status(500).send({
            message: 'Fail to process the request'
        });
    }
});
exports.addApply = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var id = { "_id": req.body.id };
    var update = { $push: {
            apply: {
                answer1: req.body.answer1,
                answer2: req.body.answer2,
                academic: req.body.academic
            }
        } };
    try {
        yield repository.addApply(id, update);
        res.send({ message: 'Apply add successfully' });
    }
    catch (e) {
        res.status(500).send({ message: 'Fail to add apply' });
    }
});
