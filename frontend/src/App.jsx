import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Profile from "./components/Profile"; 
import PastOrders from "./components/PastOrders"; 
import MenuPage from "./components/Menupage";
import Tracking from "./components/Tracking";

const INITIAL_FAVORITES = [1009, 1007, 1004, 1001];

function App() {
  // hold the entire profile object (id, email, name, role)
  const [profileData, setProfileData] = useState(null);
  const [screen, setScreen] = useState("login");
  
  // Existing states
  const [cart, setCart] = useState([]);
  const [favoriteOrders, setFavoriteOrders] = useState(INITIAL_FAVORITES);
  const [orderViewMode, setOrderViewMode] = useState("all");
  const [returnScreen] = useState("home");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  // Load profile data on application start
  useEffect(() => {
    // Check if user data is in local storage
    const storedId = localStorage.getItem('currentUserId');
    const storedEmail = localStorage.getItem('currentUserEmail');
    
    if (storedId) {
      setScreen("home");
      // Load partial data to avoid the 'User ID not found' error
      setProfileData({
        id: storedId,
        email: storedEmail,
        name: "New User", // Placeholder until full login re-establishes profile data
      });
    }
  }, []);

  // Handle Logout
  const handleLogout = () => {
    // Clear all session data
    setCart([]);
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserEmail");
    
    // Reset state
    setProfileData(null);
    setScreen("login");
  };

  return (
    <>
      {/* LOGIN SCREEN */}
      {screen === "login" && (
        <Login 
          setScreen={setScreen}
          setProfileData={setProfileData} // Prop to receive user data from Login.jsx
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
          navigateToLogin={handleLogout} // Pass the logout function for deletion success
          navigateToHome={() => setScreen("home")}
          // pass the actual profile data down for display and ID extraction
          profileData={profileData} 
          
          setCart={setCart}
          favoriteOrders={favoriteOrders}
          setFavoriteOrders={setFavoriteOrders}
          setOrderViewMode={setOrderViewMode}
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