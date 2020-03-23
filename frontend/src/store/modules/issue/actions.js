import {
  LOAD_ISSUE,
  LOAD_ISSUE_DONE,
  LOAD_ISSUE_FAVORITE,
  MARK_ISSUE_DONE,
  MARK_ISSUE_FAVORITE,
  SHOW_ISSUE,
  SYNC_ISSUE,
} from './actionTypes';
import api from '../../../services/api';

export function loadIssues() {
  return async dispatch => {
    const response = await api.get('issues');
    dispatch({ type: LOAD_ISSUE, payload: response.data });
  };
}

export function loadIssuesFavorite() {
  return async dispatch => {
    const response = await api.get('issues/favorite');
    dispatch({ type: LOAD_ISSUE_FAVORITE, payload: response.data });
  };
}

export function loadIssuesDone() {
  return async dispatch => {
    const response = await api.get('issues/done');
    dispatch({ type: LOAD_ISSUE_DONE, payload: response.data });
  };
}

export function showIssue(id, body) {
  return { type: SHOW_ISSUE, payload: { id, body } };
}

export function markIssueAsDone(index, name, id) {
  return async dispatch => {
    const response = await api.get(`issues/done/${id}`);
    dispatch({
      type: MARK_ISSUE_DONE,
      payload: { index, name, issue: response.data },
    });
  };
}

export function markIssueAsFavorite(index, name, id) {
  return async dispatch => {
    const response = await api.get(`issues/favorite/${id}`);
    dispatch({
      type: MARK_ISSUE_FAVORITE,
      payload: { index, name, issue: response.data },
    });
  };
}

export function syncIssue() {
  return async dispatch => {
    await api.get('issues/sync');
    dispatch({ type: SYNC_ISSUE });
    dispatch(loadIssues());
  };
}
