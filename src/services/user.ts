import {api} from 'src/providers';
import {getToken} from 'src/utils/auth';
import {IUser, IUserCredentials} from 'src/types/user';

export const getMe = async () => {
  const token = await getToken();
  if (!token) {
    return;
  }
  return api.get('/v1/me');
};

export const login = (credentials: IUserCredentials) =>
  api.post<IUser>('/v1/users/login', credentials);
