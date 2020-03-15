import React, { useEffect, useState } from 'react';
import differenceBy from 'lodash/differenceBy';
import { Card, Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

import { CardIssue } from './styles';

import api from '../../services/api';

import Issues from '../../components/Issues';

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [issuesDone, setIssuesDone] = useState([]);

  const [bodyIssue, setBodyIssue] = useState('');
  const [activeIssue, setActiveIssue] = useState('');

  useEffect(() => {
    const fetchIssuesDone = JSON.parse(localStorage.getItem('issues:done'));
    setIssuesDone(fetchIssuesDone || []);

    const fetchIssues = async () => {
      const response = await api.get('frontendbr/vagas/issues?state=open');

      const issueIsNotDone = differenceBy(response.data, fetchIssuesDone, 'id');
      setIssues(issueIsNotDone);
    };

    fetchIssues().then();
  }, []);

  useEffect(() => {
    localStorage.setItem('issues:done', JSON.stringify(issuesDone));
  }, [issuesDone]);

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

  return (
    <Container fluid>
      <h1>Github - Jobs</h1>

      <Row>
        <Col md={4}>
          <Issues
            issues={issues}
            active={activeIssue}
            showBodyIssue={showBodyIssue}
            markIssueAsDone={markIssueAsDone}
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
