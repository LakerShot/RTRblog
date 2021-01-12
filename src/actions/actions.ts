import { IAuth } from './../types/interfaces';
import { AppActions, ADD_POSTS, ADD_SINGLE_POST, LOADING_ALL_POSTS, LOADING_SINGLE_POST, AUTHENTICATION_ERROR, SET_USER_DATA, LOG_OUT, ADD_POST_TAG, FAVORITE_POST } from './../types/actions';
import { Dispatch } from 'redux';
import ServicesApi from '../services/servicesAPI';

import { IPosts } from '../types/interfaces';

export const addPost = (posts: Array<IPosts>): AppActions => ({
  type: ADD_POSTS,
  posts,
});

export const addSinglePost = (post: Array<IPosts>): AppActions => ({
  type: ADD_SINGLE_POST,
  post,
});

export const changeLoadingAllPosts = (payload: boolean): AppActions => ({
  type: LOADING_ALL_POSTS,
  payload,
});

export const changeLoadingSinglePost = (payload: boolean): AppActions => ({
  type: LOADING_SINGLE_POST,
  payload,
});

export const changeAuthError = (payload: boolean): AppActions => ({
  type: AUTHENTICATION_ERROR,
  payload,
});

export const setUserData = (user: IAuth): AppActions => ({
  type: SET_USER_DATA,
  user,
});

export const logOut = (): AppActions => ({
  type: LOG_OUT,
});

export const addArticleTag = (payload: string[]): AppActions => ({
  type: ADD_POST_TAG,
  payload,
});

export const changeFavotitesPost = (payload: object): AppActions => ({
  type: FAVORITE_POST,
  payload,
});

export const getPostRequest = (offset: number, token: string | null) => (
  dispatch: Dispatch
): void => {
  dispatch(changeLoadingAllPosts(true));
  const request = new ServicesApi();
  request.getRequestArticles(offset, token).then((data) => {
    dispatch(addPost(data.articles));
    dispatch(changeLoadingAllPosts(false));
  });
};

export const getSinglePostRequest = (slug: string, token: string | null) => (
  dispatch: Dispatch
): void => {
  dispatch(changeLoadingSinglePost(true));
  const request = new ServicesApi();
  request.getRequestSingleArticle(slug, token).then((data) => {
    dispatch(addSinglePost(data.article));
    dispatch(changeLoadingSinglePost(false));
  });
};

export const login = (data: object) => (dispatch: Dispatch): void => {
  const request = new ServicesApi();
  request
    .login(data)
    .then((data) => {
      localStorage.setItem(
        'login',
        JSON.stringify({
          user: data.user,
        })
      );
      dispatch(setUserData(data.user));
      dispatch(changeAuthError(false));
    })
    .catch(() => dispatch(changeAuthError(true)));
};
