import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { ModelRouter } from '../common/model-router'
import { NotFoundError } from 'restify-errors';
import { Project } from './projects.model';
import { authorize } from './../security/authz.handler'

class ProjectRouter extends ModelRouter<Project> {
    constructor() {
        super(Project)
    }

    envelope(document) {
        let resource = super.envelope(document)
        resource._links.news = `${this.basePath}/${resource._id}/news`
        return resource
    }

    protected prepareOne(query: mongoose.DocumentQuery<Project,Project>): mongoose.DocumentQuery<Project,Project> {
        return query.populate('category', 'name')  //.populate('owner', 'name')
    }

    findAll = (req, res, next) => {
        this.model.find().then(this.renderAll(res, next)).catch(next)
    }

    findById = (req, res, next) => {
        this.prepareOne(this.model.findById(req.params.id)).then(this.render(res, next)).catch(next)
    }

    findNews = (req, res, next) => {
        Project.findById(req.params.id, '+news').then(project => {
            if (!project) {
                throw new NotFoundError('Project not found')
            }
            else {
                res.json(project.news)
                return next()
            }
        }).catch(next)
    }

    replaceNews = (req, res, next) => {
        Project.findById(req.params.id).then(project => {
            if (!project) {
                throw new NotFoundError('Project not found')
            }
            else {
                project.news = req.body // Array de news
                return project.save()
            }
        }).then(project => {
            res.json(project.news)
            return next()
        }).catch(next)
    }

    saveNews = (req, res, next) => {
        let document = new Project(req.body)
        document.save().then(this.render(res, next)).catch(next)
    }

    findApply = (req, res, next) => {
        Project.findById(req.params.id, '+apply').then(project => {
            if (!project) {
                throw new NotFoundError('Project not found')
            }
            else {
                res.json(project.apply)
                return next()
            }
        }).catch(next)
    }

    replaceCandidates = (req, res, next) => {
        Project.findById(req.params.id).then(project => {
            if (!project) {
                throw new NotFoundError('Project not found')
            }
            else {
                project.apply = req.body // Array de candidates
                return project.save()
            }
        }).then(project => {
            res.json(project.apply)
            return next()
        }).catch(next)
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validadeId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [this.validadeId, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validadeId, this.update])
        application.del(`${this.basePath}/:id`, [authorize('admin'), this.validadeId, this.delete])

        application.get(`${this.basePath}/:id/news`, [this.validadeId, this.findNews])
        application.put(`${this.basePath}/:id/news`, [this.validadeId, this.replaceNews])

        application.get(`${this.basePath}/:id/apply`, [this.validadeId, this.findApply])
        application.put(`${this.basePath}/:id/canditades`, [this.validadeId, this.replaceCandidates])
    }
}

export const projectRouter = new ProjectRouter()