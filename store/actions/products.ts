export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId: string) => {
  return { type: DELETE_PRODUCT, pid: productId };
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
    console.log(resData);

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
  return {
    type: UPDATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
    },
    pid: id,
  };
};
