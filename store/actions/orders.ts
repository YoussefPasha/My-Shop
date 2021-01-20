export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems: any, totalAmount: number) => {
  return async (dispatch: any) => {
    const date = new Date();
    const res = await fetch(
      "https://my-shop-f8710-default-rtdb.firebaseio.com/orders/u1.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await res.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        items: cartItems,
        amount: totalAmount,
        id: resData.name,
        date,
      },
    });
  };
};
