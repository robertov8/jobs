const Issue = require('../schemas/Issue');
const githubService = require('../../services/github');

class IssueController {
  async index(req, res) {
    const issues = await Issue.find()
      .where({ isFav: false, isDone: false })
      .sort({
        createdAt: 1,
      });
    res.json(issues);
  }

  async favorite(req, res) {
    const issues = await Issue.find()
      .where({ isFav: true })
      .sort({
        createdAt: 1,
      });

    res.json(issues);
  }

  async favoriteId(req, res) {
    const issue = await Issue.findOne({ id: req.params.id });
    issue.isFav = !issue.isFav;
    issue.save();

    res.json(issue);
  }

  async done(req, res) {
    const issues = await Issue.find()
      .where({ isDone: true })
      .sort({
        updatedAt: -1,
      });

    res.json(issues);
  }

  async doneId(req, res) {
    const issue = await Issue.findOne({ id: req.params.id });
    issue.isDone = !issue.isDone;
    issue.save();

    res.json(issue);
  }

  async sync(req, res) {
    let index = 1;

    for (let i = 1; i < 50; i += 1) {
      const response = await githubService.get(
        `frontendbr/vagas/issues?state=open&page=${i}`
      );

      console.log(i, response.data.length);

      if (response.data.length === 0) {
        break;
      }

      response.data.forEach(issue => {
        Issue.findOneAndUpdate({ id: issue.id }, issue, {
          upsert: true,
        }).then();
      });
    }

    res.json([]);
  }
}

module.exports = new IssueController();
