import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ListIssuesGroup, Nav, Tabs, Tab, Loading } from './styles';

import { loadIssues, loadingMore } from '../../store/modules/issue/actions';
import IssueTab from '../IssueTab';

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

  function tabSelect(tab) {
    let type = 'issues';

    switch (tab) {
      case 'done':
        type = 'done';
        break;
      case 'favorites':
        type = 'favorites';
        break;
      default:
        type = 'issues';
        break;
    }

    history.push(`/${repo}/${type}`);
    return dispatch(loadIssues(repo, type));
  }

  function handleIssueTab() {
    return (
      <>
        {issues.map((issue, index) => (
          <IssueTab key={issue.id} index={index} issue={issue} />
        ))}

        <Loading onClick={() => dispatch(loadingMore())}>
          Loading more...
        </Loading>
      </>
    );
  }

  return (
    <ListIssuesGroup id="sideBar">
      <Nav variant="pills">
        <Tabs
          defaultActiveKey="issues"
          variant="pills"
          className="mb-1"
          activeKey={tab}
          onSelect={tab => tabSelect(tab)}
        >
          <Tab title="Issues" eventKey="issues">
            {tab === 'issues' && handleIssueTab()}
          </Tab>

          <Tab title="Favorite" eventKey="favorites">
            {tab === 'favorites' && handleIssueTab()}
          </Tab>

          <Tab title="Done" eventKey="done">
            {tab === 'done' && handleIssueTab()}
          </Tab>
        </Tabs>
      </Nav>
    </ListIssuesGroup>
  );
}
