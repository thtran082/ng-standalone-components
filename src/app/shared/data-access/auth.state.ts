import { IProfile, IUser } from "./model";

export interface IAuthState {
  user: IUser | null;
  profile: IProfile | null;
  status: AuthStatus;
}

export type AuthStatus = "idle" | "authenticated" | "unauthenticated";
