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

export interface IProfile extends Omit<IUser, 'token' | 'email'> {
  following: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}
