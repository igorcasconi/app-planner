import React from 'react';
import {UserProvider} from './user';

const AppProviders: React.FC = ({children}) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppProviders;
