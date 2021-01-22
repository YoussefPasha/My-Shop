import { AUTH } from "../actions/auth";

const initialState: any = {
  token: null,
  userId: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case AUTH:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
