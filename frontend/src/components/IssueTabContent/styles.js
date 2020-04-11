import styled from 'styled-components';

export const Labels = styled.span.attrs({
  className: 'badge badge-pill',
})`
  margin: 2px;
  background-color: #${props => props.color || '#fff'} !important;
`;
