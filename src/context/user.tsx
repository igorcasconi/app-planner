import React, {useContext} from 'react';

import {useQuery, useQueryClient, useMutation} from 'react-query';

import {getMe, login as loginService} from 'src/services/user';
import {setToken, clearToken} from 'src/utils/auth';
import {IUser, IUserContextData} from 'src/types/user';

const UserContext = React.createContext<IUserContextData>(
  {} as IUserContextData,
);

const UserProvider: React.FC = (props) => {
  const queryClient = useQueryClient();

  const {data: user, isLoading} = useQuery<IUser>('user', getMe);

  const {mutate: login} = useMutation(loginService, {
    onSuccess: async ({access_token, ...rest}: IUser) => {
      await setToken(access_token);
      queryClient.setQueryData('user', rest);
    },
  });

  const logout = () => {
    clearToken();
    queryClient.setQueryData('user', null);
  };

  return (
    <UserContext.Provider value={{user, isLoading, login, logout}} {...props} />
  );
};

const useUser = () => useContext(UserContext);

export {UserProvider, useUser};
