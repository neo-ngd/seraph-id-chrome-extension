import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import App from './components/app/App';

const proxyStore = new Store();

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

const theme = createMuiTheme({
  palette: {
    text: {
      primary: '#FFF',
      secondary: '#CBCFD4',
      light: '#CBCFD4',
      hint: '#00BF0B',
    },
    primary: {
      main: '#3C444D',
      dark: '#30363D',
      light: '#FFF',
      contrastText: '#00BF0B',
    },
  },
});

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('rcr-anchor')
  );
});
