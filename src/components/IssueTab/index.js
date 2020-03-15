import React from 'react';
import { Labels, ListIssues } from './styles';
import { Button } from 'react-bootstrap';
import { MdDone, MdFavorite, MdClose } from 'react-icons/md';

export default function IssueTab({
  issues,
  active,
  showBodyIssue,
  markIssueAsDone,
  uncheckIssueAsDone,
  markIssueAsFavorite,
  uncheckIssueAsFav,
}) {
  return (
    <>
      {issues.map((issue, index) => (
        <ListIssues
          key={issue.id}
          active={issue.id === active}
          className={issue.isDone ? 'bg-light' : ''}
        >
          <div
            className="title"
            onClick={() => showBodyIssue(issue.id, issue.body)}
          >
            <strong>
              <a
                href={issue['html_url']}
                target="_blank"
                rel="noopener noreferrer"
              >
                #{issue.number}
              </a>
            </strong>{' '}
            - {issue.title}
            {issue.labels.map(label => (
              <Labels key={label.id} color={label.color}>
                {label.name}
              </Labels>
            ))}
          </div>

          <div className="actions">
            <Button
              title={issue.isDone ? 'Uncheck as Read' : 'Mark as Read'}
              variant="link"
              onClick={() =>
                issue.isDone
                  ? uncheckIssueAsDone(index, issue)
                  : markIssueAsDone(index, issue)
              }
            >
              {issue.isDone ? <MdClose /> : <MdDone />}
            </Button>

            <Button
              title={issue.isFav ? 'Uncheck as Favorite' : 'Mark as Favorite'}
              variant="link"
              onClick={() =>
                issue.isFav
                  ? uncheckIssueAsFav(index, issue)
                  : markIssueAsFavorite(index, issue)
              }
            >
              <MdFavorite color={issue.isFav ? 'red' : 'blue'} />
            </Button>
          </div>
        </ListIssues>
      ))}
    </>
  );
}
