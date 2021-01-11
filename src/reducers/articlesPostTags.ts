const ArticlePostTagsReducerDefaultState: string[] = [];

export default (state = ArticlePostTagsReducerDefaultState, action: any): string[] => {
  switch (action.type) {
    case 'ADD_POST_TAG':
      return action.payload;
    default:
      return state;
  }
};
