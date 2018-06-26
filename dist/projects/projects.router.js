"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const restify_errors_1 = require("restify-errors");
const projects_model_1 = require("./projects.model");
const authz_handler_1 = require("./../security/authz.handler");
class ProjectRouter extends model_router_1.ModelRouter {
    constructor() {
        super(projects_model_1.Project);
        this.findAll = (req, res, next) => {
            this.model.find().then(this.renderAll(res, next)).catch(next);
        };
        this.findById = (req, res, next) => {
            this.prepareOne(this.model.findById(req.params.id)).then(this.render(res, next)).catch(next);
        };
        this.findNews = (req, res, next) => {
            projects_model_1.Project.findById(req.params.id, '+news').then(project => {
                if (!project) {
                    throw new restify_errors_1.NotFoundError('Project not found');
                }
                else {
                    res.json(project.news);
                    return next();
                }
            }).catch(next);
        };
        this.replaceNews = (req, res, next) => {
            projects_model_1.Project.findById(req.params.id).then(project => {
                if (!project) {
                    throw new restify_errors_1.NotFoundError('Project not found');
                }
                else {
                    project.news = req.body; // Array de news
                    return project.save();
                }
            }).then(project => {
                res.json(project.news);
                return next();
            }).catch(next);
        };
        this.saveNews = (req, res, next) => {
            let document = new projects_model_1.Project(req.body);
            document.save().then(this.render(res, next)).catch(next);
        };
        this.findApply = (req, res, next) => {
            projects_model_1.Project.findById(req.params.id, '+apply').then(project => {
                if (!project) {
                    throw new restify_errors_1.NotFoundError('Project not found');
                }
                else {
                    res.json(project.apply);
                    return next();
                }
            }).catch(next);
        };
        this.replaceCandidates = (req, res, next) => {
            projects_model_1.Project.findById(req.params.id).then(project => {
                if (!project) {
                    throw new restify_errors_1.NotFoundError('Project not found');
                }
                else {
                    project.apply = req.body; // Array de candidates
                    return project.save();
                }
            }).then(project => {
                res.json(project.apply);
                return next();
            }).catch(next);
        };
    }
    envelope(document) {
        let resource = super.envelope(document);
        resource._links.news = `${this.basePath}/${resource._id}/news`;
        return resource;
    }
    prepareOne(query) {
        return query.populate('category', 'name').populate('owner', 'name');
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validadeId, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validadeId, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validadeId, this.update]);
        application.del(`${this.basePath}/:id`, [authz_handler_1.authorize('admin'), this.validadeId, this.delete]);
        application.get(`${this.basePath}/:id/news`, [this.validadeId, this.findNews]);
        application.put(`${this.basePath}/:id/news`, [this.validadeId, this.replaceNews]);
        //application.get(`${this.basePath}/:id/apply`, [this.validadeId, this.findApply])
        //application.get(`${this.basePath}/:id/apply`, )
        //application.put(`${this.basePath}/:id/canditades`, [this.validadeId, this.replaceCandidates])
    }
}
exports.projectRouter = new ProjectRouter();
