import { ADD, EQUAL, FOLD } from '../actions/actionTypes';

const initialState = {
  display: '',
  numbers: '',
  numbersTwo: '',
  operator: '',
  result: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      if (state.operator !== '') {
        return {
          ...state,
          numbersTwo: state.numbersTwo + action.payload.value,
          display: state.numbersTwo + action.payload.value,
        };
      }
      if (state.numbers.length > 10) {
        return { ...state };
      } else {
        if (action.payload.value === '.' && state.numbers.indexOf('.') > -1) {
          return {
            ...state,
          };
        }
        return {
          ...state,
          numbers: state.numbers + action.payload.value.toString(),
          display: state.numbers + action.payload.value.toString(),
        };
      }

    case FOLD:
      return {
        ...state,
        operator: action.payload.value,
      };
    case EQUAL: // =
      if (state.numbersTwo !== '') {
        return {
          ...state,
          display: eval(state.numbers + state.operator + state.numbersTwo), // dont use eval in real project
          numbers: '',
          numbersTwo: '',
          operator: '',
        };
      } else {
        return { ...state };
      }

    default:
      return state;
  }
};

export default rootReducer;
