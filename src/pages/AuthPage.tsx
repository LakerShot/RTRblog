import React from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../actions/actions';
import { IReg } from '../types/interfaces';

const AuthPage: React.FC<IReg> = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: any) => state.isAuthentication);
  const { isAuthError } = useSelector((state: any) => state);

  const { register, handleSubmit, errors } = useForm<IReg>();

  const onSubmit = (data: any) => {
    const { email, password } = data;
    console.log(email);
    const userCredentials = {
      user: {
        email: email.toLocaleLowerCase(),
        password,
      },
    };
    dispatch(login(userCredentials));
  };

  return (
    <div className="reg-page">
      {isAuthError && (
        <Alert
          message="Authorization error"
          description="Invalid password or email. Please try it again"
          type="error"
          closable
        />
      )}
      {isAuth && <Redirect from="/sign-in" to="/articles" />}
      <div className="form">
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form__title">Sign In</h1>

          <input
            className="form__input"
            placeholder="Email"
            type="text"
            name="email"
            ref={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && <span className="no-valid">No valid email</span>}
          <input
            className="form__input"
            name="password"
            type="password"
            placeholder="Password"
            ref={register({
              required: 'Enter your password',
              minLength: 6,
              maxLength: 40,
            })}
          />
          {errors.password && <span className="no-valid">Password must have at least from 8 to 40 characters</span>}
          <button className="submit-btn">login</button>
          <p className="message">
            Don't have accaunt ? <Link to="/sign-up">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
