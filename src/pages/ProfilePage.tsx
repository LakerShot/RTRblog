import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Alert } from 'antd';
import ServicesApi from '../services/servicesAPI';
import { BlogState } from '../types/interfaces';

const ProfilePage: React.FC = (): JSX.Element => {
  const [succes, setSucces] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const state = useSelector((state: BlogState) => state.isAuthentication);

  const { register, handleSubmit, errors } = useForm();
  const { isAuth, user } = state;
  const userInfo: any = isAuth && user;

  const onSubmit = (data: any) => {
    const api = new ServicesApi();
    const { username, email, image, bio } = data;
    const result = {
      user: { username, email, image, bio },
    };

    api
      .changeProfile(result, userInfo.token)
      .then((data) => {
        localStorage.setItem('login', JSON.stringify(data));
        setSucces(true);
        setError(false);
      })
      .catch(() => {
        setSucces(false);
        setError(true);
      });
  };

  const content: JSX.Element = (
    <>
      {succes && <Alert message="Changed successfully!" type="success" closable />}
      <div className="profile-info">
        {error && <Alert message="This name or email already has been taken" type="error" />}
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <label htmlFor="username" className="profile-info__label">
            Username:
          </label>
          <input
            name="username"
            type="text"
            defaultValue={userInfo.username}
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 40,
            })}
          />
          {errors.username && <span className="no-valid">Username must have at least from 3 to 20 characters</span>}
          <label htmlFor="email" className="profile-info__label">
            Email:
          </label>
          <input
            name="email"
            type="text"
            defaultValue={userInfo.email}
            ref={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && <span className="no-valid">No valid email</span>}
          <label htmlFor="" className="profile-info__label">
            Image:
          </label>
          <input
            name="image"
            type="text"
            defaultValue={userInfo.image}
            ref={register({
              minLength: 10,
            })}
          />
          {errors.image && <span className="no-valid">No valid image url</span>}
          <label htmlFor="" className="profile-info__label" style={{ marginBottom: '10px' }}>
            About:
          </label>
          <textarea
            className="profile-info__textarea"
            name="bio"
            defaultValue={userInfo.bio}
            ref={register({
              minLength: 10,
              maxLength: 200,
            })}
          />
          {errors.bio && <span className="no-valid">Value must have at least from 10 to 200 characters</span>}
          <button className="profile-info__submit" type="submit">
            Change
          </button>
        </form>
      </div>
    </>
  );

  return content;
};

export default ProfilePage;
