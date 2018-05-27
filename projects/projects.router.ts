import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { ModelRouter } from '../common/model-router'
import { NotFoundError } from 'restify-errors';
import { Project } from './projects.model';

class ProjectRouter extends ModelRouter<Project> {
    constructor() {
        super(Project)
    }

    protected prepareOne(query: mongoose.DocumentQuery<Project,Project>): mongoose.DocumentQuery<Project,Project> {
        return query.populate('category', 'name').populate('owner', 'name')
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

    /*findById = (req, res, next) => {
        this.model.findById(req.params.id).populate('category', 'name').populate('owner', 'name')
            .then(this.render(res, next))
            .catch(next)
    }*/

    applyRoutes(application: restify.Server) {
        application.get('/projects', this.findAll)
        application.get('/projects/:id', [this.validadeId, this.findById])
        application.post('/projects', this.save)
        application.put('/projects/:id', [this.validadeId, this.replace])
        application.patch('/projects/:id', [this.validadeId, this.update])
        application.del('/projects/:id', [this.validadeId, this.delete])

        application.get('/projects/:id/news', [this.validadeId, this.findNews])
        application.put('/projects/:id/news', [this.validadeId, this.replaceNews])
    }
}

export const projectRouter = new ProjectRouter()