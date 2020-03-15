import React from 'react';
import { Nav, Tab, Tabs } from 'react-bootstrap';

import { ListIssuesGroup } from './styles';
import IssueTab from '../IssueTab';

export default function IssuesTabs({
  issues,
  issuesFavorite,
  issuesDone,
  active,
  showBodyIssue,
  markIssueAsDone,
  markIssueAsFavorite,
}) {
  return (
    <ListIssuesGroup>
      <Nav variant="pills">
        <Tabs
          defaultActiveKey="issues"
          id="github"
          variant="pills"
          className="mb-1"
        >
          <Tab title="Issues" eventKey="issues">
            <IssueTab
              issues={issues}
              active={active}
              showBodyIssue={showBodyIssue}
              markIssueAsDone={markIssueAsDone}
              markIssueAsFavorite={markIssueAsFavorite}
            />
          </Tab>
          <Tab title="Favorite" eventKey="favorite">
            <IssueTab
              issues={issuesFavorite}
              active={active}
              showBodyIssue={showBodyIssue}
              markIssueAsDone={markIssueAsDone}
              markIssueAsFavorite={markIssueAsFavorite}
            />
          </Tab>
          <Tab title="Done" eventKey="done">
            <IssueTab
              issues={issuesDone}
              active={active}
              showBodyIssue={showBodyIssue}
              markIssueAsDone={markIssueAsDone}
              markIssueAsFavorite={markIssueAsFavorite}
            />
          </Tab>
        </Tabs>
      </Nav>
    </ListIssuesGroup>
  );
}
