import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';

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
