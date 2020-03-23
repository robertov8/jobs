const Router = require('express').Router;

const routes = new Router();

const IssueController = require('./app/controllers/IssueController');

routes.get('/issues', IssueController.index);

routes.get('/issues/favorite', IssueController.favorite);
routes.get('/issues/favorite/:id', IssueController.favoriteId);

routes.get('/issues/done', IssueController.done);
routes.get('/issues/done/:id', IssueController.doneId);

routes.get('/issues/sync', IssueController.sync);

module.exports = routes;
