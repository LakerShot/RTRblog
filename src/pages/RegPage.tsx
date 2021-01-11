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

  const history = useHistory();

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
      .then(() => history.push('/sign-in'))
      .catch(() => setError(true));
  };

  return (
    <div className='reg-page'>
      {error && (
        <Alert
          message='Sign Up Error'
          description='This email has been taken by another user'
          type='error'
          closable
          onClose={errorAlerClose}
        />
      )}
      <div className='form'>
        <form className='register-form' onSubmit={handleSubmit(onSubmit)}>
            <h1 className="form__title">Sign Up</h1>
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
              className="form__input"
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
              className="form__input"
              name='password'
              type='password'
              placeholder='password'
              ref={register({
                required: 'Enter your password',
                minLength: 6,
                maxLength: 40, 
              })}
            />
            {errors.password && (
              <span className='no-valid'>
                Password must have at least from 6 to 40 characters
              </span>
            )}
            <input
              className="form__input"
              type='password'
              name='password_repeat'
              placeholder='repeat password'
              ref={register({
                validate: (value) =>
                  value === password.current || 'The passwords do not matches',
              })}
            />
            {errors.password_repeat && (
              <span className='no-valid'>{errors.password_repeat.message}</span>
            )}

            <button className='submit-btn'>create</button>
            <p className='message'>
              Already has an accaunt? <Link to='/sign-in'>Sign In</Link>
            </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
