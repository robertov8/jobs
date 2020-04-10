const Router = require('express').Router;

const routes = new Router();

const IssueController = require('./app/controllers/IssueController');

routes.get('/:repo/issues', IssueController.index);
routes.get('/:repo/issues/sync', IssueController.sync);
routes.get('/:repo/favorites', IssueController.favorite);
routes.get('/:repo/done', IssueController.done);

routes.get('/favorites/:id', IssueController.favoriteId);
routes.get('/done/:id', IssueController.doneId);

module.exports = routes;
