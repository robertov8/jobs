import {
  LOAD_ISSUE,
  LOADING_MORE_ISSUE,
  MARK_ISSUE_DONE,
  MARK_ISSUE_FAVORITE,
  SHOW_ISSUE,
  SYNC_ISSUE,
} from './actionTypes';
import api from '../../../services/api';
import { toast } from 'react-toastify';

export function loadIssues(tab) {
  return async dispatch => {
    const response = await api.get(tab);

    dispatch({ type: LOAD_ISSUE, payload: { issue: response.data, tab } });
  };
}

export function loadingMore() {
  return async (dispatch, getState) => {
    const { issues } = getState();
    const page = issues.page + 1;

    const response = await api.get(`${issues.tab}?page=${page}`);
    dispatch({
      type: LOADING_MORE_ISSUE,
      payload: { issue: response.data, page },
    });
  };
}

export function showIssue(id, body) {
  return { type: SHOW_ISSUE, payload: { id, body } };
}

export function markIssueAsDone(index, id) {
  return async dispatch => {
    const response = await api.get(`done/${id}`);
    dispatch({
      type: MARK_ISSUE_DONE,
      payload: { index, issue: response.data },
    });
  };
}

export function markIssueAsFavorite(index, id) {
  return async dispatch => {
    const response = await api.get(`favorites/${id}`);
    dispatch({
      type: MARK_ISSUE_FAVORITE,
      payload: { index, issue: response.data },
    });
  };
}

export function syncIssue() {
  return async dispatch => {
    toast.info('Syncing issues...');

    await api.get('issues/sync');
    dispatch({ type: SYNC_ISSUE });
    dispatch(loadIssues('issues'));
  };
}
