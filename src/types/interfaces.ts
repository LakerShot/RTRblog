// import { IPosts } from '../redux/types/interfaces';

export interface IPosts {
  title: string;
  author: any;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: any;
}

export interface ISlug {
  match: object;
}

export interface ILogin {
  firstName: string;
  password?: string;
}

export interface IReg {
  name: string;
  email: string;
  password: string;
  password_repeat: string;
}

export interface IAuth {
  isAuth: boolean;
  user: User | object | null | any;
}
interface User {
  [key: string]: CurrentUser;
}

interface Post {
  [key: string]: IPosts;
}

export interface CurrentUser {
  id?: number;
  email?: string;
  createdAt?: any;
  updatedAt?: any;
  username: string;
  bio: any;
  image: string;
  token: string;
}

export interface BlogState {
  posts: IPosts[] | null;
  post: IPosts | null;
  isFetchingAllPosts: boolean;
  isFetchingSinglePost: boolean;
  isAuthentication: IAuth;
  isAuthError: boolean;
  articlesPostTags: Array<string>;
}
