import React from 'react';

import { ListIssuesGroup, Nav, Tabs, Tab } from './styles';

import IssueTab from '../IssueTab';

export default function IssuesTabs({
  tab,
  tabSelect,
  issues,
  issuesFavorite,
  issuesDone,
  active,
  showBodyIssue,
  markIssueAsDone,
  uncheckIssueAsDone,
  markIssueAsFavorite,
  uncheckIssueAsFav,
}) {
  return (
    <ListIssuesGroup id="sideBar">
      <Nav variant="pills">
        <Tabs
          defaultActiveKey="issues"
          id="github"
          variant="pills"
          className="mb-1"
          activeKey={tab}
          onSelect={(tab) => tabSelect(tab)}
        >
          <Tab title={`Issues (${issues.length})`} eventKey="issues">
            <IssueTab
              name="issues"
              issues={issues}
              active={active}
              showBodyIssue={showBodyIssue}
              markIssueAsDone={markIssueAsDone}
              uncheckIssueAsDone={uncheckIssueAsDone}
              markIssueAsFavorite={markIssueAsFavorite}
              uncheckIssueAsFav={uncheckIssueAsFav}
            />
          </Tab>
          <Tab
            title={`Favorite (${issuesFavorite.length})`}
            eventKey="favorite"
          >
            <IssueTab
              name="issuesFavorite"
              issues={issuesFavorite}
              active={active}
              showBodyIssue={showBodyIssue}
              markIssueAsDone={markIssueAsDone}
              uncheckIssueAsDone={uncheckIssueAsDone}
              markIssueAsFavorite={markIssueAsFavorite}
              uncheckIssueAsFav={uncheckIssueAsFav}
            />
          </Tab>
          <Tab title={`Done (${issuesDone.length})`} eventKey="done">
            <IssueTab
              name="issuesDone"
              issues={issuesDone}
              active={active}
              showBodyIssue={showBodyIssue}
              markIssueAsDone={markIssueAsDone}
              uncheckIssueAsDone={uncheckIssueAsDone}
              markIssueAsFavorite={markIssueAsFavorite}
              uncheckIssueAsFav={uncheckIssueAsFav}
            />
          </Tab>
        </Tabs>
      </Nav>
    </ListIssuesGroup>
  );
}
