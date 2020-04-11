import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  loadIssues,
  loadingMore,
  changeRepository,
} from '../../store/modules/issue/actions';
import IssueTab from '../IssueTab';
import NavPills from '../NavPills';
import NavPillsContent from '../NavPillsContent';

import { Loading } from './styles';

export default function IssuesTabs() {
  const { repo, slug } = useParams();
  const history = useHistory();

  const tab = useSelector(state => state.issues.tab);
  const issues = useSelector(state => {
    return state.issues.issue;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    tabSelect(slug);
  }, []);

  function tabSelect(tab = 'issues') {
    history.push(`/${repo}/${tab}`);
    dispatch(changeRepository(repo));
    dispatch(loadIssues(repo, tab));
  }

  function handleIssueTab() {
    return (
      <ul className="list-group">
        {issues.map((issue, index) => (
          <IssueTab key={issue.id} index={index} issue={issue} />
        ))}

        <Loading onClick={() => dispatch(loadingMore(repo, tab))}>
          Loading more...
        </Loading>
      </ul>
    );
  }

  return (
    <>
      <ul className="nav nav-pills nav-fill mt-2 mb-2" role="tablist">
        <NavPills
          active={tab === 'issues'}
          name="issues"
          tabSelect={() => tabSelect('issues')}
        />
        <NavPills
          active={tab === 'favorites'}
          name="favorites"
          tabSelect={() => tabSelect('favorites')}
        />
        <NavPills
          active={tab === 'done'}
          name="done"
          tabSelect={() => tabSelect('done')}
        />
      </ul>

      <div className="tab-content">
        <NavPillsContent active={tab === 'issues'}>
          {tab === 'issues' && handleIssueTab()}
        </NavPillsContent>

        <NavPillsContent active={tab === 'favorites'}>
          {tab === 'favorites' && handleIssueTab()}
        </NavPillsContent>

        <NavPillsContent active={tab === 'done'}>
          {tab === 'done' && handleIssueTab()}
        </NavPillsContent>
      </div>
    </>
  );
}
