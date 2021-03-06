"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const projects_model_1 = require("./projects.model");
exports.getApply = (query) => __awaiter(this, void 0, void 0, function* () {
    var res = yield projects_model_1.Project.find(query);
    return res;
});
exports.addApply = (query, update) => __awaiter(this, void 0, void 0, function* () {
    yield projects_model_1.Project.updateOne(query, update);
});
exports.getBySlug = (slug) => __awaiter(this, void 0, void 0, function* () {
    const res = yield projects_model_1.Project.findOne({ slug: slug });
    return res;
});
