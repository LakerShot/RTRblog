import { ADD_POSTS, FAVORITE_POST } from '../../types/actions';
/* eslint-disable no-fallthrough */
import { IPosts } from '../../types/interfaces';

const AddPostsReducerDefaultState: IPosts[] = [];

export default (state = AddPostsReducerDefaultState, action: any): IPosts[] => {
  switch (action.type) {
    case ADD_POSTS:
      return action.posts;
    case FAVORITE_POST:
      return state.map((post) => {
        if (post.slug === action.payload.slug) {
          return action.payload;
        }
        return post;
      });
    default:
      return state;
  }
};
