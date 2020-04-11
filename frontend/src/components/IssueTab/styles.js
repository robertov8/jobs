import styled from 'styled-components';

export const ListGroupItem = styled.li.attrs({
  className: 'list-group-item list-group-item-action list-group-item-secondary',
})`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

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
`;
