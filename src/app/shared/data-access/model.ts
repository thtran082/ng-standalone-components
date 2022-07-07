export interface IUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface IUserResponse {
  user: IUser;
}

export interface ILoginUserRequest {
  user: IUserLogin;
}

export interface IProfile extends Omit<IUser, 'token' | 'email'> {
  following: boolean;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserSignUp extends IUserLogin {
  username: string;
}

export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export interface IComment {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  author: Profile;
}

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

export interface TagsResponse {
  tags: string[];
}

export interface MultipleArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface ITagsResponse {
  tags: string[];
}
