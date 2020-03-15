import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { MdDone, MdFavorite } from 'react-icons/md';

import { Labels, ListIssues } from './styles';

export default function Issues({
  issues,
  active,
  showBodyIssue,
  markIssueAsDone,
}) {
  return (
    <ListIssues>
      {issues.map((issue, index) => (
        <ListGroup.Item key={issue.id} active={issue.id === active}>
          <div
            className="title"
            onClick={() => showBodyIssue(issue.id, issue.body)}
          >
            <strong>
              <a href={issue['html_url']} target="_blank">
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
            <MdFavorite />
          </div>
        </ListGroup.Item>
      ))}
    </ListIssues>
  );
}
