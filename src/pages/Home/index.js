import React, { useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';

import ReactMarkdown from 'react-markdown';

import api from '../../services/api';
import { Labels, ListIssues } from './styles';

export default function Home() {
  const [issues, setIssues] = useState([]);
  const [bodyIssue, setBodyIssue] = useState('');
  const [activeIssue, setActiveIssue] = useState('');

  useEffect(() => {
    const fetchIssues = async () => {
      const response = await api.get('frontendbr/vagas/issues');

      setIssues(response.data);
    };

    fetchIssues().then();
  }, []);

  function showBodyIssue(id, body) {
    setActiveIssue(id);
    setBodyIssue(body);
  }

  return (
    <Container fluid>
      <h1>Github - Jobs</h1>

      <Row>
        <Col md={4}>
          <ListIssues>
            {issues.map(issue => (
              <ListGroup.Item
                key={issue.id}
                onClick={() => showBodyIssue(issue.id, issue.body)}
                active={issue.id === activeIssue}
              >
                <strong>#{issue.number}</strong> - {issue.title}
                {issue.labels.map(label => (
                  <Labels key={label.id} color={label.color}>
                    {label.name}
                  </Labels>
                ))}
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
