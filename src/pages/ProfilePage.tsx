import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Alert } from 'antd';
import ServicesApi from '../services/servicesAPI';

const ProfilePage: React.FC = (): JSX.Element => {
  const [succes, setSucces] = useState<boolean | null>(null);
  const [error, setError] = useState<boolean | null>(null);

  const state = useSelector((state: any) => state.isAuthentication);

  const { isAuth, user } = state;

  const userInfo: any = isAuth && user;

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    const api = new ServicesApi();
    const { username, email, image, bio } = data;
    const result = {
      user: {
        username,
        email,
        image,
        bio,
      },
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
      <div className='profile-info'>
        {succes && <Alert message='Успешно изменено!' type='success' />}
        {error && <Alert message='Такое имя или email занято!' type='error' />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='username'>username:</label>
          <input
            name='username'
            type='text'
            defaultValue={userInfo.username}
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 40,
            })}
          />
          {errors.username && (
            <span className='no-valid'>
              Username must have at least from 3 to 20 characters
            </span>
          )}
          <label htmlFor='email'>email:</label>
          <input
            name='email'
            type='text'
            defaultValue={userInfo.email}
            ref={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && <span className='no-valid'>No valid email</span>}
          <label htmlFor=''>image:</label>
          <input
            name='image'
            type='text'
            defaultValue={userInfo.image}
            ref={register({
              minLength: 10,
            })}
          />
          {errors.image && <span className='no-valid'>No valid image url</span>}
          <label htmlFor=''>about:</label>
          <textarea
            name='bio'
            defaultValue={userInfo.bio}
            ref={register({
              minLength: 10,
              maxLength: 550,
            })}
          />
          {errors.bio && (
            <span className='no-valid'>
              Value must have at least from 10 to 550 characters
            </span>
          )}
          <button type='submit'>Изменить</button>
        </form>
      </div>
    </>
  );

  return content;
};

export default ProfilePage;
