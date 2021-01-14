import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { PageHeader, Button } from 'antd';
import './Header.sass';
import userLogoNotFound from '../../assets/userLogo.svg';
import { logOut } from '../../redux/actions/actions';
import { BlogState } from '../../types/interfaces';

const Header: React.FC = (): JSX.Element => {
  const { isAuth, user } = useSelector((state: BlogState) => state.isAuthentication);
  const dispatch = useDispatch();
  const history = useHistory();

  const userAvatars: string = isAuth && (user.image ? user.image : userLogoNotFound);

  const handlerLogOut = () => {
    localStorage.removeItem('login');
    dispatch(logOut());
    history.push('/sign-in');
  };

  const createInfoProfile: JSX.Element = (
    <div className="d-flex align-center" key="info-profile">
      <Link to="/new-article">
        <span className="new-post-link">Add New Post</span>
      </Link>

      <div className="profile-group">
        <span className="d-block">{isAuth && user.username}</span>
      </div>
      <Link to="/profile">
        <div className="avatar">
          <img src={userAvatars} alt="avatar" />
        </div>
      </Link>
      <button className="log-out" onClick={handlerLogOut}>
        Log out
      </button>
    </div>
  );

  const notAuthContent: JSX.Element = (
    <React.Fragment key="auth-btn">
      <Button>
        <Link className="header_link" to="/sign-in">
          Sign In
        </Link>
      </Button>
      <Button>
        <Link className="header_link" to="/sign-up">
          Sign Up
        </Link>
      </Button>
    </React.Fragment>
  );

  return (
    <PageHeader
      title={
        <span className="header__title">
          <Link to="/">RTRblog</Link>
        </span>
      }
      extra={[isAuth ? createInfoProfile : notAuthContent]}
    />
  );
};

export default Header;
