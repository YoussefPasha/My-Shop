export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email: string, password: string) => {
  return async (dispatch: any) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8ZGsN2YxXH634Fxc6vZWTdIYoHmdZ1XE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    if (!res.ok) {
      const errorResData = await res.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists!";
      }
      throw new Error(message);
    }
    const resData = await res.json();

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const logIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8ZGsN2YxXH634Fxc6vZWTdIYoHmdZ1XE",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );
    if (!res.ok) {
      const errorResData = await res.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong!";
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      }
      throw new Error(message);
    }
    const resData = await res.json();

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
