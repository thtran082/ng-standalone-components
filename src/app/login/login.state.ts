import { ApiStatus } from './../shared/data-access/model';

export interface ILoginState {
  errors: Record<string, string[]>;
  status: ApiStatus
}
