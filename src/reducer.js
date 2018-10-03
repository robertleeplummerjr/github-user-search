import actions from './actions';

const initialState = {
  searchValue: '',
  searchData: null,
  page: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.searchData:
      return { ...state, searchData: action.value };
    case actions.searchValue:
      return { ...state, searchValue: action.value };
    case actions.page:
      return { ...state, page: action.value };
    default:
      return state;
  }
};