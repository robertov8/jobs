import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import IssueTabContent from '../IssueTabContent';
import IssueTabActions from '../IssueTabActions';

import { ListGroupItem } from './styles';

export default function IssueTab({ index, issue }) {
  const active = useSelector(state => state.issues.active);

  return (
    <ListGroupItem className={`${issue.id === active ? 'active' : ''}`}>
      <IssueTabContent index={index + 1} issue={issue} />
      <IssueTabActions index={index} issue={issue} />
    </ListGroupItem>
  );
}

IssueTab.propTypes = {
  index: PropTypes.number,
  issue: PropTypes.shape({
    id: PropTypes.number,
    isFav: PropTypes.bool,
    isDone: PropTypes.bool,
  }),
};
