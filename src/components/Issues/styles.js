import styled from 'styled-components';
import { Badge, ListGroup } from 'react-bootstrap';

export const ListIssues = styled(ListGroup)`
  .active {
    a {
      color: #fff;
    }

    .btn-link {
      color: #fff;
    }
  }

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

export const Labels = styled(Badge)`
  margin: 2px;
  background-color: #${props => props.color || '#fff'} !important;
`;
