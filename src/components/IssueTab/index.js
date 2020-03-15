import React from 'react';
import { Labels, ListIssues } from './styles';
import { Button } from 'react-bootstrap';
import { MdDone, MdFavorite } from 'react-icons/md';

export default function IssueTab({
  issues,
  active,
  showBodyIssue,
  markIssueAsDone,
  markIssueAsFavorite,
}) {
  return (
    <>
      {issues.map((issue, index) => (
        <ListIssues key={issue.id} active={issue.id === active}>
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
              title="Mark as Read"
              variant="link"
              onClick={() => markIssueAsDone(index, issue)}
            >
              <MdDone />
            </Button>

            <Button
              title="Mark as Favorite"
              variant="link"
              onClick={() => markIssueAsFavorite(issue)}
            >
              <MdFavorite color={issue.isFavorite ? 'red' : 'blue'} />
            </Button>
          </div>
        </ListIssues>
      ))}
    </>
  );
}
