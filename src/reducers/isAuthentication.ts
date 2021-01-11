import { IAuth } from './../types/interfaces';
import isEmpty from 'lodash.isempty';

const isAuthenticationReducerDefaultState: IAuth = {
  isAuth: false,
  user: null,
};

export default (state: object = isAuthenticationReducerDefaultState, action: any) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        isAuth: !isEmpty(action.user),
        user: action.user,
      };
    case 'LOG_OUT':
      return isAuthenticationReducerDefaultState;
    default:
      return state;
  }
};
