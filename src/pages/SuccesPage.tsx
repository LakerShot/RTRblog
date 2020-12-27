import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const SuccesPage: React.FC = () => {
  return (
    <Result
      status='success'
      title='Регистрация завершена успешно!'
      subTitle='Перейдите на страницу авторизации, чтобы войти на сайт.'
      extra={[
        <Button type='primary' key='console'>
          <Link to='/sign-in'>Войти</Link>
        </Button>,
      ]}
    />
  );
};

export default SuccesPage;
