declare type SuccessfullResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type ApiResponse<T> = SuccessfullResponse<T> | ErrorResponse;

declare type Metadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

declare type PaginatedResponse<T> = {
  [key: string]: T;
  metadata: Metadata;
};
