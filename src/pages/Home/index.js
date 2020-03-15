import React, { useEffect, useState } from 'react';

import { Card, Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';

import { CardIssue } from './styles';

import api from '../../services/api';

import IssuesTabs from '../../components/IssuesTabs';

export default function Home() {
  const [issues, setIssues] = useState([]);

  const [issuesDoneIndex, setIssuesDoneIndex] = useState([]);
  const [issuesDone, setIssuesDone] = useState([]);

  const [issuesFavIndex, setIssuesFavIndex] = useState([]);
  const [issuesFav, setIssuesFav] = useState([]);

  const [bodyIssue, setBodyIssue] = useState('');
  const [activeIssue, setActiveIssue] = useState('');

  useEffect(() => {
    const fetchDoneIndex = JSON.parse(localStorage.getItem('i:done:index'));
    const fetchDoneIndexData = fetchDoneIndex || [];
    setIssuesDoneIndex(fetchDoneIndexData);

    const fetchDone = JSON.parse(localStorage.getItem('i:done'));
    setIssuesDone(fetchDone || []);

    const fetchFavIndex = JSON.parse(localStorage.getItem('i:fav:index'));
    const fetchFavIndexData = fetchFavIndex || [];
    setIssuesFavIndex(fetchFavIndexData);

    const fetchFav = JSON.parse(localStorage.getItem('i:fav'));
    setIssuesFav(fetchFav || []);

    const fetchIssues = async () => {
      const response = await api.get('frontendbr/vagas/issues?state=open');

      const issueIsNotDone = response.data.map(issue => {
        let newIssue = {};

        if (fetchDoneIndexData.includes(issue.number)) {
          newIssue['isDone'] = true;
        }

        if (fetchFavIndexData.includes(issue.number)) {
          newIssue['isFav'] = true;
        }

        return { ...issue, ...newIssue };
      });

      setIssues(issueIsNotDone);
    };

    fetchIssues().then();
  }, []);

  useEffect(() => {
    localStorage.setItem('i:done', JSON.stringify(issuesDone));
  }, [issuesDone]);

  useEffect(() => {
    localStorage.setItem('i:done:index', JSON.stringify(issuesDoneIndex));
  }, [issuesDoneIndex]);

  useEffect(() => {
    localStorage.setItem('i:fav', JSON.stringify(issuesFav));
  }, [issuesFav]);

  useEffect(() => {
    localStorage.setItem('i:fav:index', JSON.stringify(issuesFavIndex));
  }, [issuesFavIndex]);

  function showBodyIssue(id, body) {
    setActiveIssue(id);
    setBodyIssue(body);
  }

  function markIssueAsDone(index, issueDone) {
    setIssuesDoneIndex([...issuesDoneIndex, issueDone.number]);
    setIssuesDone([...issuesDone, issueDone]);
    showNextIssue(index, 'done');
  }

  function markIssueAsFav(index, issueFavorite) {
    setIssuesFavIndex([...issuesFavIndex, issueFavorite.number]);
    setIssuesFav([...issuesFav, issueFavorite]);
    showNextIssue(index, 'fav');
  }

  function uncheckIssueAsFav(index, issueUncheck) {
    const issueFav = issuesFav.filter(issue => issue.id !== issueUncheck.id);
    setIssuesFav([...issueFav]);

    const issueFavIndex = issuesFavIndex.filter(i => i !== issueUncheck.number);
    setIssuesFavIndex([...issueFavIndex]);

    issues[index].isFav = false;
    setIssues([...issues]);
  }

  function uncheckIssueAsDone(index, issueUncheck) {
    const issueDone = issuesDone.filter(issue => issue.id !== issueUncheck.id);
    setIssuesDone([...issueDone]);

    const issueDoneIndex = issuesDoneIndex.filter(
      i => i !== issueUncheck.number
    );
    setIssuesDoneIndex([...issueDoneIndex]);

    issues[index].isDone = false;
    setIssues([...issues]);
  }

  function showNextIssue(index, type) {
    if (type === 'done') {
      issues[index].isDone = !issues[index].isDone;
    } else {
      issues[index].isFav = !issues[index].isFav;
    }
    setIssues([...issues]);
  }

  return (
    <Container fluid>
      <h1>Github - Jobs</h1>

      <Row>
        <Col md={4}>
          <IssuesTabs
            issues={issues}
            issuesFavorite={issuesFav}
            issuesDone={issuesDone}
            active={activeIssue}
            showBodyIssue={showBodyIssue}
            markIssueAsDone={markIssueAsDone}
            markIssueAsFavorite={markIssueAsFav}
            uncheckIssueAsFav={uncheckIssueAsFav}
            uncheckIssueAsDone={uncheckIssueAsDone}
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
