import styled from 'styled-components';
import { Badge, ListGroup } from 'react-bootstrap';

export const ListIssues = styled(ListGroup.Item)`
  a {
    color: ${props => (props.active ? '#fff' : '#007bff')};
  }

  .btn-link {
    color: ${props => (props.active ? '#fff' : '#007bff')};
  }
`;

export const Labels = styled(Badge)`
  margin: 2px;
  background-color: #${props => props.color || '#fff'} !important;
`;
