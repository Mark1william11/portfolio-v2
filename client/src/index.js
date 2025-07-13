import React from 'react';
import ReactDOM from 'react-dom/client';

// Import Mantine's core styles
// eslint-disable-next-line import/no-unresolved
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { theme } from './theme';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();