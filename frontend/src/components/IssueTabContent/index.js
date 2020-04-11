import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { showIssue } from '../../store/modules/issue/actions';

import { Labels } from './styles';

export default function IssueTabContent({ index, issue }) {
  const dispatch = useDispatch();

  return (
    <div
      className="title"
      onClick={() => dispatch(showIssue(issue.id, issue.body))}
      title={`Index: ${index} ID: ${issue.id}`}>
      <strong>
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
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
  );
}

IssueTabContent.propTypes = {
  index: PropTypes.number,
  issue: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string,
    html_url: PropTypes.string,
    number: PropTypes.string,
    title: PropTypes.string,
    labels: PropTypes.array,
  }),
};
