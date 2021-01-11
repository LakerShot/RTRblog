import { IPosts } from './../types/interfaces';

const AddSinglePostReducerDefaultState: IPosts[] = [];

export default (state = AddSinglePostReducerDefaultState, action: any): IPosts[] => {
  switch (action.type) {
    case 'ADD_SINGLE_POST':
      return action.post;
    case 'FAVORITE_POST':
      return action.payload;
    default:
      return state;
  }
};
