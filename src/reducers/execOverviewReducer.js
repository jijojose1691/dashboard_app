import { GET_EXECUTION_BY_PLATFORM, GET_RACK_NAMES } from "../actions/action";

export const execOverviewReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXECUTION_BY_PLATFORM:
      return { ...state, execuionOverviewList: action.payload };

    case GET_RACK_NAMES:
      return { ...state, rackNames: action.payload };
    default:
      return state;
  }
};
