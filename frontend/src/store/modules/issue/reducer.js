import { toast } from 'react-toastify';
import {
  CENTER_BODY_ISSUE,
  LOAD_ISSUE,
  LOADING_MORE_ISSUE,
  MARK_ISSUE_DONE,
  MARK_ISSUE_FAVORITE,
  NEXT_ISSUE,
  PREVIOUS_ISSUE,
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
        tabSize: action.payload.total,
        active: 0,
        body: '',
        issue: action.payload.issue,
      };
    case LOADING_MORE_ISSUE: {
      const moreIssue = [...state.issue, ...action.payload.issue];

      if (action.payload.issue.length) {
        toast.info(`Loading more +${action.payload.issue.length}...`);

        return {
          ...state,
          page: action.payload.page,
          issue: moreIssue,
        };
      }

      toast.warn('No more...');
      return { ...state };
    }
    case SHOW_ISSUE:
      return {
        ...state,
        active: action.payload.id,
        body: action.payload.body,
      };
    case MARK_ISSUE_DONE: {
      toast.error('Issue was done.');

      return markIssue(action.payload, state, 'isDone');
    }
    case MARK_ISSUE_FAVORITE: {
      toast.success('Issue was favorite.');

      return markIssue(action.payload, state, 'isFav');
    }
    case SYNC_ISSUE: {
      toast.success(`${action.payload.update} - Syncing was completed...`);

      return { ...state };
    }
    case NEXT_ISSUE: {
      return selectIssue(state, 1);
    }
    case PREVIOUS_ISSUE: {
      return selectIssue(state, -1);
    }
    case CENTER_BODY_ISSUE: {
      window.scrollTo(0, 0);
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

function selectIssue(state, operation) {
  const issueIndex = state.issue.findIndex(i => i.id === state.active);

  if (!state.issue[issueIndex + operation]) {
    return { ...state };
  }

  const nextActive = state.issue[issueIndex + operation].id;
  const nextBody = state.issue[issueIndex + operation].body;

  return { ...state, active: nextActive, body: nextBody };
}
