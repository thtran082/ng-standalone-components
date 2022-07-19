import { ApiStatus } from "../shared/data-access";

export interface ILoginState {
  errors: Record<string, string[]>;
  status: ApiStatus
}
