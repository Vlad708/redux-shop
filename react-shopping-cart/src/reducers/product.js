const initialState = {
  isReady: false,
  item: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCT':
      return {
        ...state,
        item: action.payload,
        isReady: true,
      };
    case 'SET_IS_READY':
      return {
        ...state,
        isReady: action.payload,
      };
      break;
    default:
      return state;
  }
};
