import React from 'react';
import {Controller, useForm} from 'react-hook-form';

import {Column, Input, Button, Text} from 'src/components';
import {useUser} from 'src/context';
import {IUserCredentials} from 'src/types/user';

const Login = () => {
  const {login} = useUser();

  const {control, handleSubmit, formState} = useForm<IUserCredentials>();

  const onSubmit = (values: IUserCredentials) => login(values);

  const {isSubmitting} = formState;

  return (
    <Column flex={1} justifyContent="center" p={40}>
      <Text>Login screen</Text>
      <Controller
        name="email"
        defaultValue=""
        control={control}
        render={({onChange, value}) => (
          <Input value={value} onChangeText={onChange} my={10} />
        )}
      />
      <Controller
        name="password"
        defaultValue=""
        control={control}
        render={({onChange, value}) => (
          <Input
            value={value}
            onChangeText={onChange}
            my={10}
            secureTextEntry
          />
        )}
      />

      <Button
        text="entrar"
        onPress={handleSubmit(onSubmit)}
        isLoading={isSubmitting}
      />
    </Column>
  );
};

export default Login;
