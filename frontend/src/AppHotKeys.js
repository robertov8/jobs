import React from 'react';
import { useDispatch } from 'react-redux';

import { HotKeys } from 'react-hotkeys';

import {
  markIssueAsDoneHotKey,
  markIssueAsFavoriteHotKey,
  nextIssue,
  previousIssue,
} from './store/modules/issue/actions';

const keyMap = {
  MOVE_UP: 'w',
  MOVE_DOWN: 's',
  DONE: 'q',
  FAVORITE: 'e',
};

export default function AppHotKeys({ children }) {
  const dispatch = useDispatch();

  const handlers = {
    MOVE_UP: () => dispatch(previousIssue()),
    MOVE_DOWN: () => dispatch(nextIssue()),
    DONE: () => dispatch(markIssueAsDoneHotKey()),
    FAVORITE: () => dispatch(markIssueAsFavoriteHotKey()),
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      {children}
    </HotKeys>
  );
}
