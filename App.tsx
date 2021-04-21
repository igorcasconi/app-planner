import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components/native';

import {Routes} from 'src/navigators';
import theme from 'src/theme';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default () => (
      <App />
);
