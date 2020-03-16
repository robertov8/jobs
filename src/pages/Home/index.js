import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Card, Col, Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import breaks from 'remark-breaks';
import Octopage from 'github-pagination';

import { useQuery } from '../../utils/router';
import api from '../../services/api';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../services/localStorage';

import { CardIssue } from './styles';

import IssuesTabs from '../../components/IssuesTabs';

export default function Home() {
  const history = useHistory();
  const page = useQuery().get('page') || 1;

  const URL = 'frontendbr/vagas/issues?state=open';

  const [pagination, setPagination] = useState({});

  const [issues, setIssues] = useState([]);

  const [issuesDoneIndex, setIssuesDoneIndex] = useState([]);
  const [issuesDone, setIssuesDone] = useState([]);

  const [issuesFavIndex, setIssuesFavIndex] = useState([]);
  const [issuesFav, setIssuesFav] = useState([]);

  const [bodyIssue, setBodyIssue] = useState('');
  const [activeIssue, setActiveIssue] = useState('');

  useEffect(() => {
    loadingData(page).then();
  }, []);

  async function loadingData(page) {
    const fetchDoneIndex = getFromLocalStorage('i:done:index', []);
    setIssuesDoneIndex(fetchDoneIndex);

    const fetchDone = getFromLocalStorage('i:done', []);
    setIssuesDone(fetchDone);

    const fetchFavIndex = getFromLocalStorage('i:fav:index', []);
    setIssuesFavIndex(fetchFavIndex);

    const fetchFav = getFromLocalStorage('i:fav', []);
    setIssuesFav(fetchFav);

    const response = await api.get(`${URL}&page=${page}`);

    setPagination(Octopage.parser(response.headers.link));

    const issueIsNotDone = response.data.map(issue => {
      let newIssue = {};

      if (fetchDone.includes(issue.number)) {
        newIssue['isDone'] = true;
      }

      if (fetchFavIndex.includes(issue.number)) {
        newIssue['isFav'] = true;
      }

      return { ...issue, ...newIssue };
    });

    setIssues(issueIsNotDone);
  }

  function showBodyIssue(id, body) {
    setActiveIssue(id);
    setBodyIssue(body);
  }

  function markIssueAsDone(index, issueDone) {
    setIssuesDoneIndex([...issuesDoneIndex, issueDone.number]);
    setIssuesDone([...issuesDone, issueDone]);
    toggleTypeIssue(index, 'done');

    saveToLocalStorage('i:done:index', [...issuesDoneIndex, issueDone.number]);
    saveToLocalStorage('i:done', [...issuesDone, issueDone]);
  }

  function markIssueAsFav(index, issueFavorite) {
    setIssuesFavIndex([...issuesFavIndex, issueFavorite.number]);
    setIssuesFav([...issuesFav, issueFavorite]);
    toggleTypeIssue(index, 'fav');

    saveToLocalStorage('i:fav', [...issuesFav, issueFavorite]);
    saveToLocalStorage('i:fav:index', [
      ...issuesFavIndex,
      issueFavorite.number,
    ]);
  }

  function uncheckIssueAsFav(index, issueUncheck) {
    const issueFav = issuesFav.filter(issue => issue.id !== issueUncheck.id);
    setIssuesFav([...issueFav]);

    const issueFavIndex = issuesFavIndex.filter(i => i !== issueUncheck.number);
    setIssuesFavIndex([...issueFavIndex]);

    issues[index].isFav = false;
    setIssues([...issues]);

    saveToLocalStorage('i:fav', [...issueFav]);
    saveToLocalStorage('i:fav:index', [...issueFavIndex]);
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

    saveToLocalStorage('i:done:index', [...issueDoneIndex]);
    saveToLocalStorage('i:done', [...issueDone]);
  }

  function toggleTypeIssue(index, type) {
    if (type === 'done') {
      issues[index].isDone = !issues[index].isDone;
    } else {
      issues[index].isFav = !issues[index].isFav;
    }
    setIssues([...issues]);
  }

  async function paginationPage(type) {
    const prevOrNext = type === 'prev' ? 'prev' : 'next';

    if (pagination[prevOrNext]) {
      history.push(`/?page=${pagination[prevOrNext]}`);
      loadingData(pagination[prevOrNext]).then();
    }
  }

  return (
    <Container fluid>
      <h1>Github - Jobs</h1>

      <Row>
        <Col md={4}>
          <IssuesTabs
            page={page}
            paginationPage={paginationPage}
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
