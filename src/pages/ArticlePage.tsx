import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Avatar, Spin } from 'antd';
import { ISlug } from '../types/interfaces';
import { getSinglePostRequest } from '../actions/actions';
import ChangePostButtons from '../components/ChangePostButtons';
import FavoriteCountBtn from '../components/FavoriteCountBtn';

const ArticlePage: React.FC<ISlug> = ({ match }: any) => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: any) => state.isAuthentication);
  const { Title, Paragraph } = Typography;
  const token = isAuth && user.token;
  const { post, isFetchingSinglePost, favoritePostsCount } = useSelector((state: any) => state);
  const {
    title,
    body,
    createdAt,
    favoritesCount,
    favorited,
    tagList,
    description,
    author,
  } = post;

  useEffect(() => {
    dispatch(getSinglePostRequest(match.params.slug, token));
  }, [dispatch, match.params.slug, token, favoritePostsCount]);

  const localStorageData: any = localStorage.getItem('login');
  const authUser: any = localStorageData && JSON.parse(localStorageData).user.username;
  const authToken: any = localStorageData && JSON.parse(localStorageData).user.token;

  const createTagList = tagList && (
    <ul className='tab__list'>
      {tagList.map((el: string) => (
        <li key={`tags_${el}`} className='tab__list_item'>
          {el}
        </li>
      ))}
    </ul>
  );

  const content: any = !isFetchingSinglePost && (
    <div className="article-container">
      {/* {authUser && authUser === author.username && (
        <ChangePostButtons slug={match.params.slug} token={authToken} />
      )} */}

      <div className='post d-flex justify-content-between'>
        <div className='d-flex'>
          <Title className='pr-3' level={4}>
            {title}
          </Title>
          <FavoriteCountBtn
            count={favoritesCount}
            slug={match.params.slug}
            favorited={favorited}
          />
        </div>

        <div className='author d-flex'>
          <div className='pr-3'>
            <span className='d-block text-center'>{author.username}</span>
            <span className='text-center'>{createdAt.substring(0, 10)}</span>
          </div>
          <div>

          </div>
          <Avatar src={author.image} alt='Han Solo' />
          {/* {authUser && authUser === author.username && (
           <ChangePostButtons slug={match.params.slug} token={authToken} />
          )} */}
        </div>
      </div>
      <div className='d-flex justify-content-between'>
        <div className="tags">
          {createTagList}
        </div>
        <div className="actions">
          {authUser && authUser === author.username && (
           <ChangePostButtons slug={match.params.slug} token={authToken} />
          )}
        </div>
      </div>
      <p>{description}</p>

      <Paragraph>{body}</Paragraph>
    </div>
  );

  return isFetchingSinglePost ? <Spin size='large' /> : content;
};

export default ArticlePage;
