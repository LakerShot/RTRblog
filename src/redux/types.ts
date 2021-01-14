import { IAuth, IPosts } from '../types/interfaces';

export const ADD_POSTS = 'ADD_POSTS';
export const LOADING_ALL_POSTS = 'LOADING_ALL_POSTS';
export const LOADING_SINGLE_POST = 'LOADING_SINGLE_POST';
export const ADD_SINGLE_POST = 'ADD_SINGLE_POST';
export const SET_USER_DATA = 'SET_USER_DATA';
export const LOG_OUT = 'LOG_OUT';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const ADD_POST_TAG = 'ADD_POST_TAG';
export const FAVORITE_POST = 'FAVORITE_POST';
export const UNFAVORITE_POST = 'UNFAVORITE_POST';

export interface AddPostsActions {
  type: typeof ADD_POSTS;
  posts: IPosts[];
}
export interface AddSinglePostActions {
  type: typeof ADD_SINGLE_POST;
  post: IPosts[];
}

export interface changeLoadingAllPostsStateAction {
  type: typeof LOADING_ALL_POSTS;
  payload: boolean;
}

export interface changeLoadingSinglePostStateAction {
  type: typeof LOADING_SINGLE_POST;
  payload: boolean;
}

export interface changeAuthError {
  type: typeof AUTHENTICATION_ERROR;
  payload: boolean;
}

export interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  user: IAuth;
}

export interface addPostTag {
  type: typeof ADD_POST_TAG;
  payload: string[];
}

export interface LogOut {
  type: typeof LOG_OUT;
}

export interface favoritePost {
  type: typeof FAVORITE_POST;
  payload: object;
}

export interface unfavoritePost {
  type: typeof UNFAVORITE_POST;
}

export type ExpenseActionTypes =
  | AddPostsActions
  | changeLoadingAllPostsStateAction
  | changeLoadingSinglePostStateAction
  | AddSinglePostActions
  | SetUserDataAction
  | LogOut
  | changeAuthError
  | addPostTag
  | favoritePost
  | unfavoritePost;

export type AppActions = ExpenseActionTypes;
