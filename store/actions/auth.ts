export const SIGNUP = "SIGNUP";

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
      throw new Error("Something went wrong!");
    }
    const resData = await res.json();
    console.log(resData);

    dispatch({ type: SIGNUP });
  };
};
