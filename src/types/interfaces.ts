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
  user: object | null;
}
