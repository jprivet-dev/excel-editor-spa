export interface ServerError {
  status: number;
  url?: string;
  name: string;
  message: string;
  detail?: string;
  exception?: string;
}

export interface ClientError {
  name: string;
  message: string;
}

export interface SymfonyHttpException {
  class: string;
  detail: string;
  status: number;
  title: string;
  trace: Object[];
  type: string;
}
