import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ArticlesPost from '../components/ArticlesPost';
import { getPostRequest } from '../actions/actions';

const ArticlesListPage: React.FC = () => {
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: any) => state.isAuthentication);
  const token: string | null = isAuth && user.token;

  const { isFetchingAllPosts, posts } = useSelector((state: any) => state);

  useEffect(() => {
    dispatch(getPostRequest(page, token));
  }, [dispatch, page, token]);

  const changePaginations = (count: number): number => {
    if (count !== 1) {
      return +`${count}0`;
    }
    return count;
  };

  const handlePaginationPage = (page: number): void => {
    setPage(changePaginations(page));
  };

  const createPostsList = posts.map((elem: any) => {
    return (
      <ArticlesPost
        key={elem.slug}
        title={elem.title}
        author={elem.author}
        body={elem.body}
        createdAt={elem.createdAt}
        description={elem.description}
        favorited={elem.favorited}
        favoritesCount={elem.favoritesCount}
        slug={elem.slug}
        tagList={elem.tagList}
      />
    );
  });

  return (
    <>
      {!isFetchingAllPosts ? createPostsList : <Spin size="large" />}
      <Pagination
        style={{ display: isFetchingAllPosts ? 'none' : 'flex' }}
        showSizeChanger={false}
        defaultCurrent={1}
        total={500}
        onChange={(page) => handlePaginationPage(page)}
      />
    </>
  );
};

export default ArticlesListPage;
