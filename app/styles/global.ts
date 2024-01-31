import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme["primary"]};
    color: ${(props) => props.theme["secondary"]};
    -webkit-font-smoothing: antialiased;
    transition: all 0.2s ease-in-out;
  }

  body, input, textarea, button {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  h1 {
    color: ${(props) => props.theme["secondary"]};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme["secondary"]};
    transition: color 0.3s;
    &:hover {
      color: ${(props) => props.theme["secondary"]}B3;
    }
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background-color: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    cursor: pointer;
  }
`;
