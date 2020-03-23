import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ListIssuesGroup, Nav, Tabs, Tab } from './styles';

import {
  loadIssues,
  loadIssuesFavorite,
  loadIssuesDone,
} from '../../store/modules/issue/actions';
import IssueTab from '../IssueTab';

export default function IssuesTabs() {
  const tab = useSelector(state => state.issues.tab);

  const issuesFav = useSelector(state => state.issues.favorite);
  const issuesDone = useSelector(state => state.issues.done);
  const issues = useSelector(state => {
    return state.issues.issue;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    tabSelect(tab);
  }, []);

  function tabSelect(tab) {
    switch (tab) {
      case 'issues':
        return dispatch(loadIssues());
      case 'favorite':
        return dispatch(loadIssuesFavorite());
      default:
        return dispatch(loadIssuesDone());
    }
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
            {issues.map((issue, index) => (
              <IssueTab
                key={issue.id}
                name="done"
                index={index}
                issue={issue}
              />
            ))}
          </Tab>

          <Tab title="Favorite" eventKey="favorite">
            {issuesFav.map((issue, index) => (
              <IssueTab
                key={issue.id}
                name="done"
                index={index}
                issue={issue}
              />
            ))}
          </Tab>

          <Tab title="Done" eventKey="done">
            {issuesDone.map((issue, index) => (
              <IssueTab
                key={issue.id}
                name="done"
                index={index}
                issue={issue}
              />
            ))}
          </Tab>
        </Tabs>
      </Nav>
    </ListIssuesGroup>
  );
}
