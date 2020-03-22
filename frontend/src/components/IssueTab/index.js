import React from 'react';
import { Labels, ListIssues } from './styles';
import { Button } from 'react-bootstrap';
import { MdDone, MdFavorite, MdClose } from 'react-icons/md';

export default function IssueTab({
  name,
  issues,
  active,
  showBodyIssue,
  markIssueAsDone,
  markIssueAsFavorite,
}) {
  return (
    <>
      {issues.map((issue, index) => (
        <ListIssues
          key={issue.number}
          active={issue.id === active}
          variant={issue.isDone ? 'secondary' : ''}
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
            {issue.labels.map((label) => (
              <Labels key={label.id} color={label.color}>
                {label.name}
              </Labels>
            ))}
          </div>

          <div className="actions">
            <Button
              title={issue.isDone ? 'Uncheck as Read' : 'Mark as Read'}
              variant="link"
              onClick={() => markIssueAsDone(index, issue.id, name)}
            >
              {issue.isDone ? (
                <MdClose color="black" />
              ) : (
                <MdDone color="darkgray" />
              )}
            </Button>

            <Button
              title={issue.isFav ? 'Uncheck as Favorite' : 'Mark as Favorite'}
              variant="link"
              onClick={() => markIssueAsFavorite(index, issue.id, name)}
            >
              <MdFavorite color={issue.isFav ? 'red' : 'darkgray'} />
            </Button>
          </div>
        </ListIssues>
      ))}
    </>
  );
}
