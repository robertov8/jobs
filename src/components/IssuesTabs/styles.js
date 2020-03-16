import styled from 'styled-components';
import {
  ListGroup,
  Nav as ReactNav,
  Tabs as ReactTabs,
  Tab as ReactTab,
} from 'react-bootstrap';

export const ListIssuesGroup = styled(ListGroup)`
  .list-group-item {
    display: flex;
    flex-direction: row;

    .title {
      flex: 1;
      flex-direction: column;
      cursor: pointer;
    }
    .actions {
      flex-direction: row;

      svg {
        margin: 5px;
      }
    }
  }
`;

export const Nav = styled(ReactNav)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const Tabs = styled(ReactTabs)``;

export const Tab = styled(ReactTab)``;
