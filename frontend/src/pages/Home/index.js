import React, { useEffect, useState } from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import breaks from 'remark-breaks';

import api from '../../services/api';

import { CardIssue } from './styles';

import IssuesTabs from '../../components/IssuesTabs';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../services/localStorage';

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [issuesFavorite, setIssuesFavorite] = useState([]);
  const [issuesDone, setIssuesDone] = useState([]);

  const [tab, setTab] = useState('');
  const [bodyIssue, setBodyIssue] = useState('');
  const [activeIssue, setActiveIssue] = useState('');

  useEffect(() => {
    loadingData().then();
  }, []);

  useEffect(() => {
    const tabLocalStorage = getFromLocalStorage('tab');
    setTab(tabLocalStorage || 'issues');
  }, []);

  async function loadingData() {
    const [issue, favorite, done] = await Promise.all([
      api.get('issues'),
      api.get('issues/favorite'),
      api.get('issues/done'),
    ]);

    setIssues(issue.data);
    setIssuesFavorite(favorite.data);
    setIssuesDone(done.data);
  }

  function showBodyIssue(id, body) {
    setActiveIssue(id);
    setBodyIssue(body);
  }

  async function markIssueAsDone(index, id) {
    const response = await api.get(`issues/done/${id}`);
    const issueDone = response.data;

    dispatchIssues(index, issueDone, 'isDone');
  }

  async function markIssueAsFav(index, id) {
    const response = await api.get(`issues/favorite/${id}`);
    const issueFavorite = response.data;

    dispatchIssues(index, issueFavorite, 'isFav');
  }

  function dispatchIssues(index, issue, type) {
    switch (tab) {
      case 'issues':
        issues[index][type] = issue[type];
        setIssues([...issues]);
        break;
      case 'favorite':
        issuesFavorite[index][type] = issue[type];
        setIssuesFavorite([...issuesFavorite]);
        break;
      default:
        issuesDone[index][type] = issue[type];
        setIssuesDone([...issuesDone]);
    }
  }

  function tabSelect(tab) {
    setTab(tab);
    saveToLocalStorage('tab', tab);
  }

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <IssuesTabs
            tab={tab}
            tabSelect={tabSelect}
            issues={issues}
            issuesFavorite={issuesFavorite}
            issuesDone={issuesDone}
            active={activeIssue}
            showBodyIssue={showBodyIssue}
            markIssueAsDone={markIssueAsDone}
            markIssueAsFavorite={markIssueAsFav}
          />
        </Col>

        <Col md={8}>
          {bodyIssue ? (
            <CardIssue>
              <Card.Body>
                <ReactMarkdown source={bodyIssue} plugins={[breaks]} />
              </Card.Body>
            </CardIssue>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
