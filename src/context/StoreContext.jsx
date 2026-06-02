import React, {
  createContext,
  useState,
  useEffect
} from "react";

export const StoreContext =
  createContext();

export const StoreProvider = ({
  children
}) => {

  // =========================
  // WISHLIST
  // =========================
  const [wishlist, setWishlist] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || []
    );

  // =========================
  // CART
  // =========================
  const [cart, setCart] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || []
    );

  // =========================
  // ORDERS
  // =========================
  const [orders, setOrders] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "orders"
        )
      ) || []
    );

  // =========================
  // SAVE DATA
  // =========================
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // =========================
  // ADD TO WISHLIST
  // =========================
  const addToWishlist = (
    item
  ) => {

    const exists =
      wishlist.find(
        (i) =>
          i._id === item._id
      );

    if (!exists) {

      setWishlist([
        ...wishlist,
        item
      ]);
    }
  };

  // =========================
  // REMOVE FROM WISHLIST
  // =========================
  const removeFromWishlist = (
    id
  ) => {

    const updatedWishlist =
      wishlist.filter(
        (item) =>
          item._id !== id
      );

    setWishlist(
      updatedWishlist
    );
  };

  // =========================
  // NORMALIZE PRODUCT
  // =========================
  const normalizeProduct = (
    item
  ) => {

    return {

      ...item,

      productname:
        item.productname ||
        item.product_name,

      productprice:
        item.productprice ||
        item.product_price,

      productimage:
        item.productimage ||
        item.image ||
        item.productImage,

      image:
        item.productimage ||
        item.image ||
        item.productImage,

      qty:
        item.qty || 1
    };
  };

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (
    item
  ) => {

    const normalizedItem =
      normalizeProduct(item);

    const exists =
      cart.find(
        (i) =>

          i._id === normalizedItem._id &&
          i.size === normalizedItem.size
      );

    // PRODUCT EXISTS
    if (exists) {

      const updatedCart =
        cart.map((i) =>

          i._id === normalizedItem._id &&
          i.size === normalizedItem.size

            ? {
                ...i,
                qty: i.qty + 1
              }

            : i
        );

      setCart(updatedCart);
    }

    // NEW PRODUCT
    else {

      setCart([
        ...cart,

        {
          ...normalizedItem,
          qty: 1
        }
      ]);
    }
  };

  // =========================
  // REMOVE FROM CART
  // =========================
  const removeFromCart = (
    id,
    size
  ) => {

    const updatedCart =
      cart.filter(
        (item) =>

          !(

            item._id === id &&
            item.size === size

          )
      );

    setCart(updatedCart);
  };

  // =========================
  // INCREASE QUANTITY
  // =========================
  const increaseQty = (
    id,
    size
  ) => {

    const updatedCart =
      cart.map((item) =>

        item._id === id &&
        item.size === size

          ? {
              ...item,
              qty: item.qty + 1
            }

          : item
      );

    setCart(updatedCart);
  };

  // =========================
  // DECREASE QUANTITY
  // =========================
  const decreaseQty = (
    id,
    size
  ) => {

    const updatedCart =
      cart.map((item) =>

        item._id === id &&
        item.size === size

          ? {
              ...item,

              qty:
                item.qty > 1
                  ? item.qty - 1
                  : 1
            }

          : item
      );

    setCart(updatedCart);
  };

  // =========================
  // BUY NOW
  // =========================
  const buyNow = (
    products
  ) => {

    if (
      Array.isArray(products)
    ) {

      const normalizedProducts =
        products.map((p) =>
          normalizeProduct(p)
        );

      const updatedOrders = [
        ...orders,
        ...normalizedProducts
      ];

      setOrders(updatedOrders);
    }

    else {

      const normalizedProduct =
        normalizeProduct(products);

      const updatedOrders = [
        ...orders,
        normalizedProduct
      ];

      setOrders(updatedOrders);
    }
  };

  return (

    <StoreContext.Provider

      value={{

        wishlist,
        cart,
        orders,

        setWishlist,
        setCart,
        setOrders,

        addToWishlist,
        removeFromWishlist,

        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,

        buyNow
      }}
    >

      {children}

    </StoreContext.Provider>
  );
};