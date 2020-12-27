import React from 'react';
import { useForm } from 'react-hook-form';

import { IReg } from '../types/interfaces';
import { login } from '../actions/actions';
import { Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const AuthPage: React.FC<IReg> = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: any) => state.isAuthentication);
  const { isAuthError } = useSelector((state: any) => state);

  const { register, handleSubmit, errors } = useForm<IReg>();

  const onSubmit = (data: any) => {
    const { email, password } = data;
    const result = {
      user: {
        email,
        password,
      },
    };
    dispatch(login(result));
  };

  return (
    <div className='reg-page'>
      {isAuthError && (
        <Alert
          message='Ошибка авторизации'
          description='Не правильно введённый пароль или email'
          type='error'
        />
      )}
      {isAuth && <Redirect from='/sign-in' to='/articles' />}
      <div className='form'>
        <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Sign In</legend>

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
              placeholder='Password'
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
            <button className='submit-btn'>login</button>
            <p className='message'>
              Already registered? <Link to='/sign-up'>Sign Up</Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
