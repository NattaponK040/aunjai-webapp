import { actionTypes } from 'app/store/actionType';
import { createStore } from 'redux';

export const initial = {
  signInWithEmail: '',
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.EMAIL_SIGNIN:
      return {
        ...state,
        signInWithEmail: action.signInWithEmail,
      };
    default:
      break;
  }
  return state;
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const peristedState = loadState();

const store = createStore(reducer, peristedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
