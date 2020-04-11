import styled from 'styled-components';

export const Loading = styled.li.attrs({
  className: 'list-group-item list-group-item-dark',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  min-width: 350px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: filter 0.2s;

  :hover {
    filter: brightness(90%);
  }
`;
