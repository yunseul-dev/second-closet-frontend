import { createGlobalStyle } from 'styled-components';

import boldWoff2 from '../assets/fonts/Pretendard-Bold.subset.woff2';
import extraBoldWoff2 from '../assets/fonts/Pretendard-ExtraBold.subset.woff2';
import mediumWoff2 from '../assets/fonts/Pretendard-Medium.subset.woff2';
import regularWoff2 from '../assets/fonts/Pretendard-Regular.subset.woff2';
import semiBoldWoff2 from '../assets/fonts/Pretendard-SemiBold.subset.woff2';

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'Pretendard';
  font-weight: 400;
  src: local('Pretendard Reglar'), url(${regularWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 500;
  src: local('Pretendard Medium'), url(${mediumWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 600;
  src: local('Pretendard Semi Bold'), url(${semiBoldWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 700;
  src: local('Pretendard Bold'), url(${boldWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 800;
  src: local('Pretendard Extra Bold'), url(${extraBoldWoff2}) format('woff2');
  font-display: swap;
}

  #root{
    min-height: 100vh;
    width: 100%;
    font-size: 16px;
    font-family: 'Pretendard', sans-serif;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    min-height: 100%;
    width: 100%;
    
    background-color: var(--bg-color);
    color: var(--font-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: scroll;
  }

  html {
    height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  a {
  color: inherit;
  text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: inherit;

    ::-webkit-scrollbar {
      display: none;
    }
  }
  
  button {
    border: none;
    outline: none;
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  }

  .sr-only {
  overflow: hidden;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  clip-path: polygon(0 0, 0 0, 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
}
`;

export default GlobalStyle;
