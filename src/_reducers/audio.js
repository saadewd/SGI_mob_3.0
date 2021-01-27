const iniTisalState = {
  data: {},
};

export const AudioReducer = (state = iniTisalState, action) => {
  switch (action.type) {
    case 'SET_Audio':
      return {...state, data: action.payload};
    default:
      return state;
  }
};
