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
  CHANGE_REPOSITORY,
} from './actionTypes';
import api from '../../../services/api';
import { toast } from 'react-toastify';

export function loadIssues(repo, tab) {
  return async dispatch => {
    const response = await api.get(`${repo}/${tab}`);

    const total = response.headers['x-count-total'] || 0;

    dispatch({
      type: LOAD_ISSUE,
      payload: { issue: response.data, repo, tab, total },
    });
  };
}

export function loadingMore(repo, tab) {
  return async (dispatch, getState) => {
    const { issues } = getState();
    const page = issues.page + 1;

    const response = await api.get(`${repo}/${tab}?page=${page}`);

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

export function syncIssue(repo) {
  return async dispatch => {
    toast.info(`${repo} - Syncing issues...`);

    const response = await api.get(`${repo}/issues/sync`);
    dispatch({ type: SYNC_ISSUE, payload: { update: response.data } });
    dispatch(loadIssues(repo, 'issues'));
  };
}

export function nextIssue() {
  return dispatch => {
    dispatch({ type: NEXT_ISSUE });
    dispatch(centerBodyIssue());
  };
}

export function previousIssue() {
  return dispatch => {
    dispatch({ type: PREVIOUS_ISSUE });
    dispatch(centerBodyIssue());
  };
}

export function markIssueAsDoneHotKey() {
  return (dispatch, getState) => {
    const { issues } = getState();

    const issueIndex = issues.issue.findIndex(i => i.id === issues.active);

    dispatch(markIssueAsDone(issueIndex, issues.active));
  };
}

export function markIssueAsFavoriteHotKey() {
  return (dispatch, getState) => {
    const { issues } = getState();

    const issueIndex = issues.issue.findIndex(i => i.id === issues.active);

    dispatch(markIssueAsFavorite(issueIndex, issues.active));
  };
}

export function centerBodyIssue() {
  return { type: CENTER_BODY_ISSUE };
}

export function changeRepository(repo) {
  return { type: CHANGE_REPOSITORY, payload: repo };
}
