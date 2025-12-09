import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Profile from "./components/Profile"; 
import PastOrders from "./components/PastOrders"; 
import MenuPage from "./components/Menupage";
import Tracking from "./components/Tracking";
import Promotions from "./components/Promotions";
import CardManagement from "./components/CardManagement";

const INITIAL_FAVORITES = [1009, 1007, 1004, 1001];

// Define the list of promotions here, accessible to App.jsx
const PROMOTIONS_DATA = [
    { code: 'FREESHIP25', type: 'shipping', value: 5.99, minOrder: 25, icon: '🚚', description: 'Free delivery on orders $25 or more.' },
    { code: 'SJSU25OFF', type: 'percent', value: 0.25, maxDiscount: 10.00, minOrder: 0, icon: '🏷️', description: 'Get 25% off your subtotal (max $10 discount).' },
];

function App() {
  // STATES for User and Authentication
  const [profileData, setProfileData] = useState(null);
  const [screen, setScreen] = useState("login");
  
  // Tracks the currently applied promotion (code, type, value, etc.)
  const [appliedDiscount, setAppliedDiscount] = useState(null); 
  
  // NEW STATE: Stores completed orders to display in PastOrders
  const [orderHistory, setOrderHistory] = useState([]); 

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
      // Load partial data to avoid profile display errors
      setProfileData({
        id: storedId,
        email: storedEmail,
        name: "New User", // Placeholder until full login
      });
    }
  }, []);

  // Handle Logout (Used by Profile.jsx for deletion success)
  const handleLogout = () => {
    // Clear all session data
    setCart([]);
    setAppliedDiscount(null); // Clear discount upon logout
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserEmail");
    
    // Reset state
    setProfileData(null);
    setScreen("login");
  };
  
  // Function to apply a discount from Promotions.jsx
  const applyDiscount = (promo) => {
    setAppliedDiscount(promo);
  };

  // Function to add a completed order (called by Cart.jsx)
  const completeOrder = (newOrder) => {
    setOrderHistory(prevHistory => [newOrder, ...prevHistory]); // Add new order to the top
  };

  return (
    <>
      {/* LOGIN SCREEN */}
      {screen === "login" && (
        <Login 
          setScreen={setScreen}
          setProfileData={setProfileData} // Prop to receive user data
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

      {/* CART (Pass Discount and Order Handler) */}
      {screen === "cart" && (
        <Cart 
          setScreen={setScreen} 
          cart={cart} 
          setCart={setCart} 
          appliedDiscount={appliedDiscount} // PASS DISCOUNT
          selectedRestaurantId={selectedRestaurantId}
          completeOrder={completeOrder}
        />
      )}

      {/* PAYMENT (Checkout Summary) */}
      {screen === "payment" && (
        <Payment 
          setScreen={setScreen}
          cart={cart}
          returnScreen={returnScreen}
          appliedDiscount={appliedDiscount} // PASS DISCOUNT
        />
      )}

      {/* PROFILE (Pass Profile Data) */}
      {screen === "profile" && (
        <Profile
          setScreen={setScreen}
          navigateToLogin={handleLogout} 
          navigateToHome={() => setScreen("home")}
          profileData={profileData} // PASS PROFILE DATA
          
          setCart={setCart}
          favoriteOrders={favoriteOrders}
          setFavoriteOrders={setFavoriteOrders}
          setOrderViewMode={setOrderViewMode}
          cart={cart}
        />
      )}
      
      {/* PROMOTIONS */}
      {screen === "promotions" && (
        <Promotions
            setScreen={setScreen}
            applyDiscount={applyDiscount}
            promotions={PROMOTIONS_DATA}
        />
      )}

      {/* CARD MANAGEMENT (Target for Wallet button)*/}
      {screen === "cardManagement" && (
        <CardManagement 
            setScreen={setScreen}
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
          orderHistory={orderHistory}
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