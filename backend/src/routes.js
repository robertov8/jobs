const Router = require('express').Router;

const routes = new Router();

const IssueController = require('./app/controllers/IssueController');

routes.get('/issues', IssueController.index);

routes.get('/favorites', IssueController.favorite);
routes.get('/favorites/:id', IssueController.favoriteId);

routes.get('/done', IssueController.done);
routes.get('/done/:id', IssueController.doneId);

routes.get('/issues/sync', IssueController.sync);

module.exports = routes;
