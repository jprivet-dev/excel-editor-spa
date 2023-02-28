import { Token } from './auth.models';
import { toEmpty } from '@shared/utils';

// @see https://stackoverflow.com/a/60758392/13480534
export const isTokenExpired = (token: string): boolean => {
  const result = token.split('.');

  if (result.length === 3) {
    const exp = JSON.parse(atob(result[1])).exp;
    const now = Math.floor(new Date().getTime() / 1000);
    return now >= exp;
  }

  return false;
};

export const isTokenValid = (token: Token): boolean => {
  return isTokenExpired(toEmpty(token));
};
