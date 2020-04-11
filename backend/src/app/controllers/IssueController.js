const Issue = require('../schemas/Issue');
const githubService = require('../../services/github');

const { tokenGithubAuthorization } = require('../../../.env.js');

const pagination = 30;

class IssueController {
  async index(req, res) {
    const { repo } = req.params;
    const { page = 1 } = req.query;

    const issuesCount = await Issue.find({ repo, isFav: false, isDone: false });

    res.header('X-Count-Total', issuesCount.length);

    const issues = await Issue.find()
      .where({ repo, isFav: false, isDone: false })
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * pagination)
      .limit(pagination);
    res.json(issues);
  }

  async favorite(req, res) {
    const { repo } = req.params;
    const { page = 1 } = req.query;

    const issuesCount = await Issue.find({ repo, isFav: true, isDone: false });

    res.header('X-Count-Total', issuesCount.length);

    const issues = await Issue.find()
      .where({ repo, isFav: true, isDone: false })
      .sort({
        updatedAt: -1,
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
    const { repo } = req.params;
    const { page = 1 } = req.query;

    const issuesCount = await Issue.find({ repo, isDone: true });

    res.header('X-Count-Total', issuesCount.length);

    const issues = await Issue.find()
      .where({ repo, isDone: true })
      .sort({
        updatedAt: -1,
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
    const { repo } = req.params;

    let update = 0;

    for (let i = 1; i < 50; i += 1) {
      try {
        const response = await githubService.get(
          `${repo}/vagas/issues?state=open&page=${i}`,
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
              update += 1;

              return Issue.create({
                ...issue,
                repo,
                isFav: false,
                isDone: false,
              }).then();
            }

            return issueResult.save({ ...issue }).then();
          });
        });
      } catch (e) {
        console.error(e);
        break;
      }
    }

    res.json(update);
  }
}

module.exports = new IssueController();
