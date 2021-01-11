import React from 'react';
import { withRouter } from 'react-router-dom';
import { Comment, Tooltip, Avatar } from 'antd';
import './ArticlesPost.sass';
import FavoriteCountBtn from '../FavoriteCountBtn';
import userLogoNotFound from '../../assets/userLogo.svg';

const ArticlesPost: React.FC<any> = ({
  title,
  author,
  createdAt,
  description,
  favoritesCount,
  slug,
  tagList,
  history,
  favorited,
}): JSX.Element => {
  const actions = [
    <FavoriteCountBtn
      count={favoritesCount}
      slug={slug}
      favorited={favorited}
    />,
  ];

  return (
    <Comment
      actions={actions}
      content={
        <div className="post">
          <div className="post__info">
            <h2 className='post__title' onClick={() => history.push(`/articles/${slug}`)}>
              {title}
            </h2>
            <span className="post__dateAt">
              <Tooltip title={createdAt}>
                <small>{createdAt.substring(0, 10)}</small>
              </Tooltip>
            </span>
            <ul className='tab__list'>
              {tagList.map((el: string) => (
                <li key={`tags_${el}`} className='tab__list_item'>
                  {el}
                </li>
              ))}
            </ul>
            <p className='post__description'>{description}</p>
          </div>
          <div className="post__user">
            <span className="post__username">{author.username}</span>
            <Avatar src={author.image} alt='author' icon={userLogoNotFound}/>
          </div>
        </div>
      }
    />
  );
};

export default withRouter(ArticlesPost);
