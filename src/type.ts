export interface InputUpdateExchangeInfo {
  src: string;
  tgt: string;
  rate: number;
  date?: String;
}

export interface InputDeleteExchangeInfo {
  src: string;
  tgt: string;
  date: string;
}

export interface ExchangeInfo {
  src: string;
  tgt: string;
  rate: number;
  date: string;
}

export enum ErorMessage {
  REQUIRED_PARAM_MISSING = 'REQUIRED_PARAM_MISSING',
}
