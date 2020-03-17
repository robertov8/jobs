import React from 'react';

import { ListIssuesGroup, Nav, Tabs, Tab } from './styles';

import IssueTab from '../IssueTab';
import IssuePagination from '../IssuePagination';

export default function IssuesTabs({
  page,
  paginationOptions,
  paginationActions,
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
        >
          <Tab title={`Issues (${issues.length})`} eventKey="issues">
            <IssueTab
              issues={issues}
              active={active}
              showBodyIssue={showBodyIssue}
              markIssueAsDone={markIssueAsDone}
              uncheckIssueAsDone={uncheckIssueAsDone}
              markIssueAsFavorite={markIssueAsFavorite}
              uncheckIssueAsFav={uncheckIssueAsFav}
            />

            <IssuePagination
              page={page}
              paginationOptions={paginationOptions}
              paginationActions={paginationActions}
              className="mb-2"
            />
          </Tab>
          <Tab
            title={`Favorite (${issuesFavorite.length})`}
            eventKey="favorite"
          >
            <IssueTab
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
