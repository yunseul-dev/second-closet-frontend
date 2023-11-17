import { createGlobalStyle } from 'styled-components';

import blackWoff from '../assets/fonts/Pretendard-Black.woff';
import blackWoff2 from '../assets/fonts/Pretendard-Black.woff2';

import boldWoff from '../assets/fonts/Pretendard-Bold.woff';
import boldWoff2 from '../assets/fonts/Pretendard-Bold.woff2';
import extraBoldWoff from '../assets/fonts/Pretendard-ExtraBold.woff';
import extraBoldWoff2 from '../assets/fonts/Pretendard-ExtraBold.woff2';

import lightWoff from '../assets/fonts/Pretendard-Light.woff';
import lightWoff2 from '../assets/fonts/Pretendard-Light.woff2';
import extraLightWoff from '../assets/fonts/Pretendard-ExtraLight.woff';
import extraLightWoff2 from '../assets/fonts/Pretendard-ExtraLight.woff2';

import mediumWoff from '../assets/fonts/Pretendard-Medium.woff';
import mediumWoff2 from '../assets/fonts/Pretendard-Medium.woff2';

import regularWoff from '../assets/fonts/Pretendard-Regular.woff';
import regularWoff2 from '../assets/fonts/Pretendard-Regular.woff2';

import semiBoldWoff from '../assets/fonts/Pretendard-SemiBold.woff';
import semiBoldWoff2 from '../assets/fonts/Pretendard-SemiBold.woff2';

import thinWoff from '../assets/fonts/Pretendard-Thin.woff';
import thinWoff2 from '../assets/fonts/Pretendard-Thin.woff2';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Pretendard';
  font-weight: 100;
  src: local('Pretendard Thin'), url(${thinWoff}) format('woff'),url(${thinWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 200;
  src: local('Pretendard Extra Bold'),url(${extraLightWoff}) format('woff'),url(${extraLightWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 300;
  src: local('Pretendard Light'), url(${lightWoff}) format('woff'),url(${lightWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 400;
  src: local('Pretendard Reglar'), url(${regularWoff}) format('woff'),url(${regularWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 500;
  src: local('Pretendard Medium'), url(${mediumWoff}) format('woff'),url(${mediumWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 600;
  src: local('Pretendard Semi Bold'), url(${semiBoldWoff}) format('woff'),url(${semiBoldWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 700;
  src: local('Pretendard Bold'), url(${boldWoff}) format('woff'),url(${boldWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 800;
  src: local('Pretendard Extra Bold'), url(${extraBoldWoff}) format('woff'),url(${extraBoldWoff2}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Pretendard';
  font-weight: 900;
  src: local('Pretendard Black'), url(${blackWoff}) format('woff'),url(${blackWoff2}) format('woff2');
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
