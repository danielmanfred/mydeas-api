"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_model_1 = require("./categories/categories.model");
const jestCli = require("jest-cli");
const projects_model_1 = require("./projects/projects.model");
const projects_router_1 = require("./projects/projects.router");
const environment_1 = require("./common/environment");
const server_1 = require("./server/server");
const users_model_1 = require("./users/users.model");
const users_router_1 = require("./users/users.router");
let server;
const beforeAllTests = () => {
    environment_1.environment.db.url = process.env.DB_URL || 'mongodb://localhost/mydeas-test';
    environment_1.environment.server.port = process.env.SERVER_PORT || 3001;
    server = new server_1.Server();
    return server.bootstrap([users_router_1.userRouter, projects_router_1.projectRouter])
        .then(() => users_model_1.User.remove({}).exec())
        .then(() => {
        let admin = new users_model_1.User();
        admin.name = 'admin';
        admin.email = 'admin@gmail.com';
        admin.password = 'nimda';
        admin.profiles = ['admin', 'user'];
        return admin.save();
    })
        .then(() => projects_model_1.Project.remove({}).exec())
        .then(() => categories_model_1.Category.remove({}).exec());
};
const afterAllTests = () => {
    return server.shutdown();
};
beforeAllTests().then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);
