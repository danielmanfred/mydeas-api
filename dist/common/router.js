"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const restify_errors_1 = require("restify-errors");
class Router extends events_1.EventEmitter {
    envelope(document) {
        return document;
    }
    envelopeAll(documents, options = {}) {
        return documents;
    }
    respond(req, res, next) {
        res.send({
            name: 'Mydeas API',
            version: '1.0.0'
        });
    }
    render(res, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                //res.json(this.envelope(document))
                res.json(document);
            }
            else {
                throw new restify_errors_1.NotFoundError('Document not found');
            }
            return next(false);
        };
    }
    renderAll(res, next, options = {}) {
        return (documents) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', document);
                    //array[index] = this.envelope(document)
                });
                //res.json(this.envelopeAll(documents, options))
                res.json(documents);
            }
            else {
                //res.json(this.envelopeAll([]))
                res.json([]);
            }
            return next(false);
        };
    }
}
exports.Router = Router;
