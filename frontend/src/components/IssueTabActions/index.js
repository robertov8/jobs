import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import {
  markIssueAsDone,
  markIssueAsFavorite,
} from '../../store/modules/issue/actions';

import { MdClose, MdDone, MdFavorite } from 'react-icons/md';

import { Button } from './styles';

export default function IssueTabActions({ index, issue }) {
  const dispatch = useDispatch();

  return (
    <div className="actions">
      <Button
        title={issue.isDone ? 'Uncheck as Read' : 'Mark as Read'}
        onClick={() => dispatch(markIssueAsDone(index, issue.id))}>
        {issue.isDone ? <MdClose color="black" /> : <MdDone color="darkgray" />}
      </Button>

      <Button
        title={issue.isFav ? 'Uncheck as Favorite' : 'Mark as Favorite'}
        onClick={() => dispatch(markIssueAsFavorite(index, issue.id))}>
        <MdFavorite color={issue.isFav ? 'red' : 'darkgray'} />
      </Button>
    </div>
  );
}

IssueTabActions.propTypes = {
  index: PropTypes.number,
  issue: PropTypes.shape({
    id: PropTypes.number,
    isDone: PropTypes.bool,
    isFav: PropTypes.bool,
  }),
};
