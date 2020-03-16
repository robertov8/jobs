import React from 'react';

import { ListIssuesGroup, Nav, Tabs, Tab } from './styles';

import IssueTab from '../IssueTab';
import IssuePagination from '../IssuePagination';

export default function IssuesTabs({
  page,
  paginationPage,
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
              uncheckIssueAsDone={uncheckIssueAsDone}
              markIssueAsFavorite={markIssueAsFavorite}
              uncheckIssueAsFav={uncheckIssueAsFav}
            />

            <IssuePagination
              page={page}
              paginationPage={paginationPage}
              className="mb-2"
            />
          </Tab>
          <Tab title="Favorite" eventKey="favorite">
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
          <Tab title="Done" eventKey="done">
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
