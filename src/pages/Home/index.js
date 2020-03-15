import React, { useEffect, useState } from 'react';
import differenceBy from 'lodash/differenceBy';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { MdFavorite, MdDone } from 'react-icons/md';
import ReactMarkdown from 'react-markdown';

import api from '../../services/api';
import { Labels, ListIssues } from './styles';

export default function Home() {
  const [bodyIssue, setBodyIssue] = useState('');
  const [activeIssue, setActiveIssue] = useState('');
  const [issues, setIssues] = useState([]);
  const [issuesDone, setIssuesDone] = useState([]);

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

  function markIssueAsDone(issueDone) {
    setIssuesDone([...issuesDone, issueDone]);

    const issueIsNotDone = issues.filter(issue => issue.id !== issueDone.id);
    setIssues([...issueIsNotDone]);
  }

  return (
    <Container fluid>
      <h1>Github - Jobs</h1>

      <Row>
        <Col md={4}>
          <ListIssues>
            {issues.map(issue => (
              <ListGroup.Item key={issue.id} active={issue.id === activeIssue}>
                <div
                  className="title"
                  onClick={() => showBodyIssue(issue.id, issue.body)}
                >
                  <strong>
                    <a href={issue.html_url} target="_blank">
                      #{issue.number}
                    </a>
                  </strong>{' '}
                  - {issue.title}
                  {issue.labels.map(label => (
                    <Labels key={label.id} color={label.color}>
                      {label.name}
                    </Labels>
                  ))}
                </div>
                <div className="actions">
                  <Button variant="link" onClick={() => markIssueAsDone(issue)}>
                    <MdDone />
                  </Button>
                  <MdFavorite />
                </div>
              </ListGroup.Item>
            ))}
          </ListIssues>
        </Col>

        <Col md={8}>
          <ReactMarkdown source={bodyIssue} />
        </Col>
      </Row>
    </Container>
  );
}
