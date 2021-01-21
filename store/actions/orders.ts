import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        "https://my-shop-f8710-default-rtdb.firebaseio.com/orders/u1.json"
      );
      if (!res.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await res.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems: any, totalAmount: number) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const date = new Date();
    const res = await fetch(
      `https://my-shop-f8710-default-rtdb.firebaseio.com/orders/u1.json?auth=${token}`,
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
