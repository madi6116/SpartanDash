import React, { useState } from "react";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Profile from "./components/Profile"; 
import PastOrders from "./components/PastOrders"; 
import MenuPage from "./components/Menupage";
import Tracking from "./components/Tracking";

// FAVORITES EXAMPLE (can stay)
const INITIAL_FAVORITES = [1009, 1007, 1004, 1001];

function App() {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [screen, setScreen] = useState("login");
  const [cart, setCart] = useState([]);
  const [favoriteOrders, setFavoriteOrders] = useState(INITIAL_FAVORITES);
  const [orderViewMode, setOrderViewMode] = useState("all");
  const [returnScreen] = useState("home");

  // Track restaurant for MenuPage
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  // Handle Logout
  const handleLogout = () => {
    setCart([]);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setCurrentUserEmail(null);
    setScreen("login");
  };

  return (
    <>
      {/* LOGIN SCREEN */}
      {screen === "login" && (
        <Login 
          setScreen={setScreen}
          setCurrentUserEmail={setCurrentUserEmail}
        />
      )}

      {/* HOME */}
      {screen === "home" && (
        <HomePage 
          setScreen={setScreen}
          cart={cart}
          setSelectedRestaurantId={setSelectedRestaurantId}
        />
      )}

      {/* CART */}
      {screen === "cart" && (
        <Cart 
          setScreen={setScreen} 
          cart={cart} 
          setCart={setCart} 
        />
      )}

      {/* PAYMENT */}
      {screen === "payment" && (
        <Payment 
          setScreen={setScreen}
          cart={cart}
          returnScreen={returnScreen}
        />
      )}

      {/* PROFILE */}
      {screen === "profile" && (
        <Profile
          setScreen={setScreen}
          handleLogout={handleLogout}
          navigateToHome={() => setScreen("home")}
          setCart={setCart}
          favoriteOrders={favoriteOrders}
          setFavoriteOrders={setFavoriteOrders}
          setOrderViewMode={setOrderViewMode}
          currentUserEmail={currentUserEmail}
        />
      )}

      {/* PAST ORDERS */}
      {screen === "pastOrders" && (
        <PastOrders
          navigateToProfile={() => setScreen("profile")}
          setScreen={setScreen}
          setCart={setCart}
          favoriteOrders={favoriteOrders}
          setFavoriteOrders={setFavoriteOrders}
          orderViewMode={orderViewMode}
        />
      )}

      {/* MENU PAGE */}
      {screen === "menu" && (
        <MenuPage 
          setScreen={setScreen}
          restaurantId={selectedRestaurantId}
          setCart={setCart}
        />
      )}

      {/* TRACKING PAGE */}
      {screen === "tracking" && (
        <Tracking 
          setScreen={setScreen}
          setCart={setCart}
        />
      )}
    </>
  );
}

export default App;
