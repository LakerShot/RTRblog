import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import { IReg } from '../types/interfaces';

import { Alert } from 'antd';

import ServicesApi from '../services/servicesAPI';

const RegistrationPage: React.FC<IReg> = () => {
  const [error, setError] = useState<boolean>(false);

  const { register, handleSubmit, watch, errors } = useForm<IReg>();

  const password = useRef({});
  password.current = watch('password', '');

  const errorAlerClose = () => {
    setError(false);
  };

  let history = useHistory();

  const onSubmit = (data: any) => {
    const api = new ServicesApi();
    const { name, email, password } = data;
    const result = {
      user: {
        username: name,
        email,
        password,
      },
    };
    api
      .registration(result)
      .then(() => history.push('/succes'))
      .catch(() => setError(true));
  };

  return (
    <div className='reg-page'>
      {error && (
        <Alert
          message='Ошибка регистрации'
          description='Пользователь с таким именем или email уже зарегистрирован'
          type='error'
          closable
          onClose={errorAlerClose}
        />
      )}
      <div className='form'>
        <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Sign Up</legend>
            <input
              type='text'
              placeholder='Name'
              ref={register({ required: true, maxLength: 20, minLength: 3 })}
              name='name'
            />
            {errors.name && (
              <span className='no-valid'>
                Login must have at least from 3 to 20 characters
              </span>
            )}
            <input
              placeholder='Email'
              type='text'
              name='email'
              ref={register({
                required: true,
                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && <span className='no-valid'>No valid email</span>}
            <input
              name='password'
              type='password'
              placeholder='password'
              ref={register({
                required: 'Enter your password',
                minLength: 8,
                maxLength: 40,
              })}
            />
            {errors.password && (
              <span className='no-valid'>
                Password must have at least from 8 to 40 characters
              </span>
            )}
            <input
              type='password'
              name='password_repeat'
              placeholder='repeat password'
              ref={register({
                validate: (value) =>
                  value === password.current || 'The passwords do not match',
              })}
            />
            {errors.password_repeat && (
              <span className='no-valid'>{errors.password_repeat.message}</span>
            )}

            <button className='submit-btn'>create</button>
            <p className='message'>
              Already registered? <Link to='/sign-in'>Sign In</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
