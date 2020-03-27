import { toast } from 'react-toastify';
import {
  LOAD_ISSUE,
  LOADING_MORE_ISSUE,
  MARK_ISSUE_DONE,
  MARK_ISSUE_FAVORITE,
  SHOW_ISSUE,
  SYNC_ISSUE,
} from './actionTypes';

const STATE = {
  page: 1,
  tab: 'issues',
  tabSize: 0,
  active: 0,
  body: '',
  issue: [],
};

export default function issues(state = STATE, action) {
  switch (action.type) {
    case LOAD_ISSUE:
      return {
        ...state,
        tab: action.payload.tab,
        tabSize: action.payload.issue.length,
        active: 0,
        body: '',
        issue: action.payload.issue,
      };
    case LOADING_MORE_ISSUE: {
      toast.info('Loading more...');

      const moreIssue = [...state.issue, ...action.payload.issue];
      return {
        ...state,
        page: action.payload.page,
        issue: moreIssue,
        tabSize: moreIssue.length,
      };
    }
    case SHOW_ISSUE:
      return { ...state, active: action.payload.id, body: action.payload.body };
    case MARK_ISSUE_DONE: {
      toast.success('Issue was done.');

      return markIssue(action.payload, state, 'isDone');
    }
    case MARK_ISSUE_FAVORITE: {
      toast.success('Issue was favorite.');

      return markIssue(action.payload, state, 'isFav');
    }
    case SYNC_ISSUE: {
      toast.success('Syncing was completed...');

      return { ...state };
    }
    default:
      return state;
  }
}

function markIssue(payload, state, type = 'isFav') {
  state.issue[payload.index][type] = payload.issue[type];
  return { ...state, issue: [...state.issue] };
}
