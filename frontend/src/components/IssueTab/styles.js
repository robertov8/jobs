import styled from 'styled-components';
import { Badge, ListGroup } from 'react-bootstrap';

export const ListIssues = styled(ListGroup.Item)`
  .btn-link {
    color: ${props => (props.active ? '#000' : '')};
    padding: 6px 2px;
  }
`;

export const Labels = styled(Badge)`
  margin: 2px;
  background-color: #${props => props.color || '#fff'} !important;
`;
