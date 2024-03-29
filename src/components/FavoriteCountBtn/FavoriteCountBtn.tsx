import React from 'react';
import { Tooltip } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { changeFavotitesPost } from '../../redux/actions/actions';
import servicesApi from '../../services/servicesAPI';
import { BlogState } from '../../types/interfaces';

const FavoriteCountBtn: React.FC<any> = ({ count, slug, favorited }): JSX.Element => {
  const { isAuth, user } = useSelector((state: BlogState) => state.isAuthentication);
  const token = isAuth && user.token;
  const dispatch = useDispatch();

  const onClickBtn = () => {
    const api = new servicesApi();
    const method = favorited ? 'DELETE' : 'POST';
    api
      .changeRequest(null, token, method, `articles/${slug}/favorite`)
      .then((data) => dispatch(changeFavotitesPost(data.article)));
  };

  return (
    <Tooltip key="comment-basic-like-sdasf" title={!isAuth ? 'Not authorized' : 'Like'}>
      <button className="post__like_btn" onClick={onClickBtn} disabled={!isAuth}>
        {favorited ? <HeartFilled /> : <HeartOutlined />}
        <span className="comment-action">{count}</span>
      </button>
    </Tooltip>
  );
};

export default FavoriteCountBtn;
