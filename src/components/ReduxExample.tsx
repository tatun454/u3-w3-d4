import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  updateQuantity,
} from "../store/reducers/cartReducer";
import {
  setUser,
  clearUser,
  updateUserProfile,
} from "../store/reducers/userReducer";
import {
  fetchUserData,
  fetchProducts,
  checkoutCart,
} from "../store/actions/asyncActions";

interface Product {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const ReduxExample: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: any) => state.cart);
  const userState = useAppSelector((state: any) => state.user);

  const { products, total } = cart;
  const { user, isLoading, error } = userState;

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchProducts());
    dispatch(fetchUserData("1"));
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart(product));
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeItemFromCart(productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    const result = await dispatch(checkoutCart());
    if (checkoutCart.fulfilled.match(result)) {
      alert(`Order placed successfully! Order ID: ${result.payload.orderId}`);
      dispatch(clearCart());
    } else {
      alert("Checkout failed. Please try again.");
    }
  };

  const handleUpdateUser = () => {
    if (user) {
      dispatch(updateUserProfile({ firstName: "Updated", lastName: "Name" }));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Redux Multi-Reducer & Async Operations Demo</h1>

      {/* User Section */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <h2>User Profile</h2>
        {isLoading && <p>Loading user data...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {user && (
          <div>
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <button onClick={handleUpdateUser}>Update Name</button>
            <button onClick={() => dispatch(clearUser())}>Clear User</button>
          </div>
        )}
      </div>

      {/* Cart Section */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <h2>Shopping Cart</h2>
        <p>
          <strong>Total:</strong> ${total.toFixed(2)}
        </p>

        <div style={{ marginBottom: "20px" }}>
          <h3>Products:</h3>
          {products.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            products.map((product: Product) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>
                  {product.title} - ${product.price}
                </span>
                <div>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(product.id, product.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveFromCart(product.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleClearCart}>Clear Cart</button>
          <button onClick={handleCheckout} disabled={products.length === 0}>
            Checkout
          </button>
        </div>
      </div>

      {/* Async Actions Demo */}
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h2>Async Actions</h2>
        <button onClick={() => dispatch(fetchUserData("2"))}>
          Load Different User
        </button>
        <button onClick={() => dispatch(fetchProducts())}>
          Refresh Products
        </button>
      </div>
    </div>
  );
};

export default ReduxExample;
