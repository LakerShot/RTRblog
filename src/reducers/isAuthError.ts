const isAuthErrorReducerDefaultState: boolean = false;

export default (
  state = isAuthErrorReducerDefaultState,
  action: any
): boolean => {
  switch (action.type) {
    case 'AUTHENTICATION_ERROR':
      return (state = action.payload);
    default:
      return state;
  }
};
