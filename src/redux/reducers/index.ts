import { combineReducers } from 'redux';

import posts from './posts';
import isFetchingAllPosts from './isFetchingAllPosts';
import isFetchingSinglePost from './isFetchingSinglePost';
import post from './post';
import isAuthentication from './isAuthentication';
import isAuthError from './isAuthError';
import articlesPostTags from './articlesPostTags';

export const rootReducer: any = combineReducers({
  posts,
  post,
  isFetchingAllPosts,
  isFetchingSinglePost,
  isAuthentication,
  isAuthError,
  articlesPostTags,
});
