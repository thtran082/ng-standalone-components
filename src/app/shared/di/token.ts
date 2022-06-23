import { InjectionToken } from "@angular/core";
import { BASE_URL as baseUrl } from "../data-access/constants";

export const BASE_URL = new InjectionToken<string>(
  baseUrl,
)
