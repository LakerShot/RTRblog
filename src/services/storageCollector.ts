import isEmpty from 'lodash.isempty';
import { IAuth } from '../types/interfaces';

export default (): IAuth | null => {
  const data = localStorage.getItem('login') as string;
  const parse = JSON.parse(data);
  if (!isEmpty(parse) && parse) return parse.user;
  return null;
};
