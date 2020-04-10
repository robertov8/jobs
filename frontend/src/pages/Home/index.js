import React from 'react';
import { useSelector } from 'react-redux';

import { Card, Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

import { CardIssue } from './styles';

import IssuesTabs from '../../components/IssuesTabs';

export default function Home() {
  const body = useSelector(state => state.issues.body);

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <IssuesTabs />
        </Col>

        <Col md={8}>
          {body ? (
            <CardIssue bg="dark" text="white">
              <Card.Body>
                <ReactMarkdown source={body} plugins={[breaks]} />
              </Card.Body>
            </CardIssue>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
