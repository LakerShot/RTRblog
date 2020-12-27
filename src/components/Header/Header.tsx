import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { PageHeader, Button } from 'antd';

import { logOut } from '../../actions/actions';
import './Header.sass';

const Header: React.FC = (): JSX.Element => {
  const { isAuth, user } = useSelector((state: any) => state.isAuthentication);
  const dispatch = useDispatch();
  let history = useHistory();

  const userAvatars: any =
    isAuth &&
    (user.image
      ? user.image
      : 'https://img.icons8.com/fluent/48/000000/user-male.png');

  const handlerLogOut = () => {
    localStorage.removeItem('login');
    dispatch(logOut());
    history.push('/sign-in');
  };

  const createInfoProfile: JSX.Element = (
    <div className='d-flex align-center' key='info-profile'>
      <Link to='/new-article'>
        <span className='new-post-link'>Add New Post</span>
      </Link>

      <div className='profile-group'>
        <span className='d-block'>{isAuth && user.email}</span>
        <button onClick={handlerLogOut}>Выйти</button>
      </div>
      <Link to='/profile'>
        <div className='avatar'>
          <img src={userAvatars} alt='' />
        </div>
      </Link>
    </div>
  );

  const notAuthContent: JSX.Element = (
    <React.Fragment key='auth-btn'>
      <Button>
        <Link to='/sign-in'>Sign In</Link>
      </Button>
      <Button>
        <Link to='/sign-up'>Sign Up</Link>
      </Button>
    </React.Fragment>
  );

  return (
    <PageHeader
      key={Math.random()}
      className='site-page-header'
      title={
        <span className='header__title'>
          <Link to='/'>Blog Platform</Link>
        </span>
      }
      subTitle='by Aleksandr Judin'
      extra={[isAuth ? createInfoProfile : notAuthContent]}
    ></PageHeader>
  );
};

export default Header;
