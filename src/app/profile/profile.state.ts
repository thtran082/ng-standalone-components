import { ApiStatus, IProfile } from './../shared/data-access/model';

export interface IProfileState {
  profile: IProfile | null;
  status: ApiStatus;
}