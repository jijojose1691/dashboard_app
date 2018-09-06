import { GET_EXECUTION_BY_PLATFORM, GET_PLATFORM_OVERVIEW } from "../actions/action";

export const execOverviewReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXECUTION_BY_PLATFORM:
      return { ...state, execuionOverviewList: action.payload };

    case GET_PLATFORM_OVERVIEW:
      console.log("inside resucer")
      console.log(action.payload)
      return { ...state, platformOverviewList: action.payload };
    default:
      return state;
  }
};
