import { LOADING_ALL_POSTS } from './../types/actions';
const isFetchingAllReducerDefaultState: boolean = true;

export default (state = isFetchingAllReducerDefaultState,action: any): boolean => {
  switch (action.type) {
    case LOADING_ALL_POSTS:
      return (state = action.payload);
    default:
      return state;
  }
};
