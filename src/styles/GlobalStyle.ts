import { createGlobalStyle } from 'styled-components';

import gaeguBold from '../assets/fonts/Gaegu-Bold.ttf';
import gaeguLight from '../assets/fonts/Gaegu-Light.ttf';
import gaeguRegular from '../assets/fonts/Gaegu-Regular.ttf';

import nanumRegular from '../assets/fonts/NanumPenScript-Regular.ttf';

import bubblegumsans from '../assets/fonts/BubblegumSans-Regular.ttf';

import gamjaflowerRegular from '../assets/fonts/GamjaFlower-Regular.ttf';

const GlobalStyle = createGlobalStyle`
  #root{
    min-height: 100vh;
    width: 100%;
    font-size: 2rem;
    font-family: 'Noto Sans KR', sans-serif;

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

@font-face {
  font-family: 'Gaegu';
  font-weight: 700;
  src: local('Gaegu'), url(${gaeguBold}) format('truetype');
  font-display: swap;
}

@font-face {
  font-family: 'Gaegu';
  font-weight: 400;
  src: local('Gaegu'), url(${gaeguLight}) format('truetype');
  font-display: swap;
}

@font-face {
  font-family: 'Gaegu';
  font-weight: 500;
  src: local('Gaegu'), url(${gaeguRegular}) format('truetype');
  font-display: swap;
}


@font-face {
  font-family: 'Nanum Pen Script';
  font-weight: 500;
  src: local('Nanum Pen Script'), url(${nanumRegular}) format('truetype');
  font-display: swap;
}

@font-face {
  font-family: 'Bubble Gum Sans';
  font-weight: 500;
  src: local('Bubble Gum Sans'), url(${bubblegumsans}) format('truetype');
  font-display: swap;
}

@font-face {
  font-family: 'Gamja Flower';
  font-weight: 500;
  src: local('Gamja Flower'), url(${gamjaflowerRegular}) format('truetype');
  font-display: swap;
}



`;

export default GlobalStyle;
