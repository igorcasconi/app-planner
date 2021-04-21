import {UseMutateFunction} from 'react-query';

export interface IUser {
  name: string;
  email: string;
  access_token: string;
}

export interface IUserContextData {
  user: IUser | undefined;
  isLoading: boolean;
  login: UseMutateFunction<IUser, unknown, IUserCredentials, unknown>;
  logout(): void;
}

export interface IUserCredentials {
  email: string;
  password: string;
}
