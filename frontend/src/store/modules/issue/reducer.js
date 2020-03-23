import {
  LOAD_ISSUE,
  LOAD_ISSUE_DONE,
  LOAD_ISSUE_FAVORITE,
  MARK_ISSUE_DONE,
  MARK_ISSUE_FAVORITE,
  SHOW_ISSUE,
  SYNC_ISSUE,
} from './actionTypes';

const STATE = {
  tab: 'issues',
  tabSize: 0,
  active: 0,
  body: '',
  issue: [],
  favorite: [],
  done: [],
};

export default function issues(state = STATE, action) {
  switch (action.type) {
    case LOAD_ISSUE:
      return {
        ...state,
        tab: 'issues',
        tabSize: action.payload.length,
        active: 0,
        body: '',
        issue: action.payload,
        favorite: [],
        done: [],
      };
    case LOAD_ISSUE_FAVORITE:
      return {
        ...state,
        tab: 'favorite',
        tabSize: action.payload.length,
        active: 0,
        body: '',
        issue: [],
        favorite: action.payload,
        done: [],
      };
    case LOAD_ISSUE_DONE:
      return {
        ...state,
        tab: 'done',
        tabSize: action.payload.length,
        active: 0,
        body: '',
        issue: [],
        favorite: [],
        done: action.payload,
      };
    case SHOW_ISSUE:
      return { ...state, active: action.payload.id, body: action.payload.body };
    case MARK_ISSUE_DONE:
      return markIssue(action.payload, state, 'isDone');
    case MARK_ISSUE_FAVORITE:
      return markIssue(action.payload, state, 'isFav');
    case SYNC_ISSUE:
      return { ...state };
    default:
      return state;
  }
}

function markIssue(payload, state, type = 'isFav') {
  switch (payload.name) {
    case 'issue':
      state.issue[payload.index][type] = payload.issue[type];
      return { ...state, issue: [...state.issue] };
    case 'favorite':
      state.favorite[payload.index][type] = payload.issue[type];
      return { ...state, favorite: [...state.favorite] };
    default:
      state.done[payload.index][type] = payload.issue[type];
      return { ...state, done: [...state.done] };
  }
}
