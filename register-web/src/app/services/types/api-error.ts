export interface DetailsError {
  [key: string]: unknown;
}

export interface ApiError {
  statusCode: number;
  message: string;
  timestamp: string;
  errorType: string;
  details?: DetailsError;
}
