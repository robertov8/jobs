import React, { useEffect, useState } from 'react';
import differenceBy from 'lodash/differenceBy';

import { Card, Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

import { CardIssue } from './styles';

import api from '../../services/api';

import IssuesTabs from '../../components/IssuesTabs';

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [issuesDone, setIssuesDone] = useState([]);
  const [issuesFavorite, setIssuesFavorite] = useState([]);

  const [bodyIssue, setBodyIssue] = useState('');
  const [activeIssue, setActiveIssue] = useState('');

  useEffect(() => {
    const fetchDone = JSON.parse(localStorage.getItem('issues:done'));
    setIssuesDone(fetchDone || []);

    const fetchFavorite = JSON.parse(localStorage.getItem('issues:favorite'));
    setIssuesFavorite(fetchFavorite || []);

    const fetchIssues = async () => {
      const response = await api.get('frontendbr/vagas/issues?state=open');

      const issueIsNotDone = differenceBy(response.data, fetchDone, 'id');
      const issueWithFavorites = differenceBy(
        issueIsNotDone,
        fetchFavorite,
        'id'
      );

      setIssues(issueWithFavorites);
    };

    fetchIssues().then();
  }, []);

  useEffect(() => {
    localStorage.setItem('issues:done', JSON.stringify(issuesDone));
  }, [issuesDone]);

  useEffect(() => {
    localStorage.setItem('issues:favorite', JSON.stringify(issuesFavorite));
  }, [issuesFavorite]);

  function showBodyIssue(id, body) {
    setActiveIssue(id);
    setBodyIssue(body);
  }

  function markIssueAsDone(index, issueDone) {
    setIssuesDone([...issuesDone, issueDone]);

    const issueIsNotDone = issues.filter(issue => issue.id !== issueDone.id);
    setIssues([...issueIsNotDone]);

    setActiveIssue(issues[index + 1].id);
    setBodyIssue(issues[index + 1].body);
  }

  function markIssueAsFavorite(issueFavorite) {
    const issueIndex = issues.findIndex(issue => issue.id === issueFavorite.id);

    issues[issueIndex]['isFavorite'] = true;

    setIssues([...issues]);
    setIssuesFavorite([...issuesFavorite, issueFavorite]);
  }

  return (
    <Container fluid>
      <h1>Github - Jobs</h1>

      <Row>
        <Col md={4}>
          <IssuesTabs
            issues={issues}
            issuesFavorite={issuesFavorite}
            issuesDone={issuesDone}
            active={activeIssue}
            showBodyIssue={showBodyIssue}
            markIssueAsDone={markIssueAsDone}
            markIssueAsFavorite={markIssueAsFavorite}
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
