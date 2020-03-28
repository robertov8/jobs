const Issue = require('../schemas/Issue');
const githubService = require('../../services/github');

const { tokenGithubAuthorization } = require('../../../.env.js');

const pagination = 30;

class IssueController {
  async index(req, res) {
    const page = req.query.page || 1;

    const issuesCount = await Issue.find({ isFav: false, isDone: false });

    res.header('X-Count-Total', issuesCount.length);

    const issues = await Issue.find()
      .where({ isFav: false, isDone: false })
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * pagination)
      .limit(pagination);
    res.json(issues);
  }

  async favorite(req, res) {
    const page = req.query.page || 1;

    const issuesCount = await Issue.find({ isFav: true });

    res.header('X-Count-Total', issuesCount.length);

    const issues = await Issue.find()
      .where({ isFav: true })
      .sort({
        createdAt: 1,
      })
      .skip((page - 1) * pagination)
      .limit(pagination);

    res.json(issues);
  }

  async favoriteId(req, res) {
    const issue = await Issue.findOne({ id: req.params.id });
    issue.isFav = !issue.isFav;
    issue.save();

    res.json(issue);
  }

  async done(req, res) {
    const page = req.query.page || 1;

    const issuesCount = await Issue.find({ isDone: true });

    res.header('X-Count-Total', issuesCount.length);

    const issues = await Issue.find()
      .where({ isDone: true })
      .sort({
        updatedAt: 1,
      })
      .skip((page - 1) * pagination)
      .limit(pagination);

    res.json(issues);
  }

  async doneId(req, res) {
    const issue = await Issue.findOne({ id: req.params.id });
    issue.isDone = !issue.isDone;
    issue.save();

    res.json(issue);
  }

  async sync(req, res) {
    for (let i = 1; i < 50; i += 1) {
      const response = await githubService.get(
        `frontendbr/vagas/issues?state=open&page=${i}`,
        {
          headers: {
            Authorization: tokenGithubAuthorization || '',
          },
        }
      );

      if (response.data.length === 0) {
        break;
      }

      response.data.forEach(issue => {
        Issue.findOne({ id: issue.id }).then(issueResult => {
          if (!issueResult) {
            return Issue.create({
              ...issue,
              isFav: false,
              isDone: false,
            }).then();
          }

          return issueResult.save({ ...issue }).then();
        });
      });
    }

    res.json([]);
  }
}

module.exports = new IssueController();
