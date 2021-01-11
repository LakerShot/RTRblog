const isFetchingSingleReducerDefaultState: boolean = true;

export default (state = isFetchingSingleReducerDefaultState, action: any): boolean => {
  switch (action.type) {
    case 'LOADING_SINGLE_POST':
      return (state = action.payload);
    default:
      return state;
  }
};
