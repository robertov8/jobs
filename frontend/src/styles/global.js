import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
    height: 100%;
    background: rgba(52, 58, 64, 0.5);
  }
  
  body {
    -webkit-font-smoothing: antialiased !important;
  }
`;
