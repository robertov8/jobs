import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'react-bootstrap';
import { MdDone, MdFavorite, MdClose } from 'react-icons/md';

import { Labels, ListIssues } from './styles';
import {
  showIssue,
  markIssueAsDone,
  markIssueAsFavorite,
} from '../../store/modules/issue/actions';

export default function IssueTab({ name, index, issue }) {
  const dispatch = useDispatch();
  const active = useSelector(state => state.issues.active);

  return (
    <ListIssues
      key={issue.number}
      active={issue.id === active}
      variant={issue.isDone ? 'secondary' : ''}
    >
      <div
        className="title"
        onClick={() => dispatch(showIssue(issue.id, issue.body))}
        title={`Index: ${index + 1} ID: ${issue.id}`}
      >
        <strong>
          <a href={issue['html_url']} target="_blank" rel="noopener noreferrer">
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
          onClick={() => dispatch(markIssueAsDone(index, name, issue.id))}
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
          onClick={() => dispatch(markIssueAsFavorite(index, name, issue.id))}
        >
          <MdFavorite color={issue.isFav ? 'red' : 'darkgray'} />
        </Button>
      </div>
    </ListIssues>
  );
}
