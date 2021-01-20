import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        "https://my-shop-f8710-default-rtdb.firebaseio.com/products.json"
      );
      if (!res.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await res.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any) => {
    const res = await fetch(
      `https://my-shop-f8710-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const resData = await res.json();

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  return async (dispatch: any) => {
    const res = await fetch(
      "https://my-shop-f8710-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );

    const resData = await res.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};
export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
) => {
  return async (dispatch: any) => {
    const res = await fetch(
      `https://my-shop-f8710-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await res.json();

    dispatch({
      type: UPDATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
      },
      pid: id,
    });
  };
};
