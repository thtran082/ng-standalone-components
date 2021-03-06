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

export interface IProfileResponse {
  profile: IProfile;
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
  author: IProfile;
}

export interface IProfile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: IProfile;
}

export interface IArticleResponse {
  article: IArticle;
}

export interface IMultipleArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IMultipleCommentResponse {
  comments: IComment[];
}

export interface IArticleRequest {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ITagsResponse {
  tags: string[];
}

export interface IUserSettings {
  image: string;
  username: string;
  bio: string;
  email: string;
  token: string;
}
