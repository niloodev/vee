export interface BaseResponse<T> {
  message: string;
  payload: T;
}

export interface BaseError<T extends string> {
  error: T;
}

export type ControllerResult<T, E extends string> =
  | BaseResponse<T>
  | BaseError<E>;
