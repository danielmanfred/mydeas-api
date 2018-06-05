"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_router_1 = require("./categories/categories.router");
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const projects_router_1 = require("./projects/projects.router");
const server = new server_1.Server();
server.bootstrap([users_router_1.userRouter, projects_router_1.projectRouter, categories_router_1.categoryRouter]).then(server => {
    console.log('Server is listening on: ', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
