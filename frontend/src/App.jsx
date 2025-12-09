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
import CancelConfirm from "./components/CancelConfirm";
import ReviewAndTip from "./components/ReviewAndTip";
import CourierApplication from "./components/CourierApplication";
import JobOffer from "./components/JobOffer"; // Assuming you have this mock component
import MockStorePortal from "./components/MockStorePortal"; // Assuming you have this mock component
import MockAdminPortal from "./components/MockAdminPortal"; // Assuming you have this mock component

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
  // Tracks user's courier application status
  const [courierStatus, setCourierStatus] = useState("None");
  
  // Tracks the currently applied promotion (code, type, value, etc.)
  const [appliedDiscount, setAppliedDiscount] = useState(null); 
  
  // Stores completed orders to display in PastOrders
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

    // Function to cancel the latest order and update history
    const cancelLatestOrder = () => {
        setOrderHistory(prevHistory => {
            if (prevHistory.length === 0) return prevHistory;

            // Get the most recent order (the one at index 0)
            const latestOrder = prevHistory[0];

            // Create a new, canceled version of that order
            const canceledOrder = {
                ...latestOrder,
                restaurant: `[CANCELED] ${latestOrder.restaurant}`, // Indicate cancellation in the name
                total: 0.00, // Optionally zero out the total for clarity
                status: 'CANCELED'
            };

            // Return the new array with the canceled order replacing the old one
            return [canceledOrder, ...prevHistory.slice(1)];
        });
    };


  return (
    <>
      {/* LOGIN SCREEN */}
      {screen === "login" && (
        <Login 
          setScreen={setScreen}
          setProfileData={setProfileData} // Prop to receive user data
          setCourierStatus={setCourierStatus} // Pass setter for role bypass in Login
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
            courierStatus={courierStatus} // PASS COURIER STATUS
            setCourierStatus={setCourierStatus} // PASS COURIER STATUS SETTER
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

      {/* PAST ORDERS (Updated to pass courierStatus for role-based view) */}
      {screen === "pastOrders" && (
        <PastOrders
          navigateToProfile={() => setScreen("profile")}
          setScreen={setScreen}
          setCart={setCart}
          favoriteOrders={favoriteOrders}
          setFavoriteOrders={setFavoriteOrders}
          orderViewMode={orderViewMode}
          orderHistory={orderHistory}
          // OPTIONAL BUT RECOMMENDED: Pass courierStatus
          courierStatus={courierStatus} 
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

      {/* TRACKING PAGE (Pass Cancellation Handler) */}
      {screen === "tracking" && (
        <Tracking 
          setScreen={setScreen}
          setCart={setCart}
          cancelLatestOrder={cancelLatestOrder}
        />
      )}
    
    {/* REVIEW AND TIP PAGE */}
    {screen === "reviewAndTip" && (
        <ReviewAndTip setScreen={setScreen} />
    )}

    {/* COURIER APPLICATION SCREEN */}
    {screen === "courierApply" && (
        <CourierApplication 
          setScreen={setScreen} 
          setCourierStatus={setCourierStatus} 
        />
    )}
    
    {/* MOCK COURIER JOB OFFER SCREEN */}
    {screen === "jobOffer" && (
        <JobOffer 
            setScreen={setScreen}
        />
    )}

    {/* MOCK STORE PORTAL SCREEN */}
    {screen === "storePortal" && (
        <MockStorePortal 
            setScreen={setScreen}
        />
    )}

    {/* MOCK ADMIN PORTAL SCREEN */}
    {screen === "adminPortal" && (
        <MockAdminPortal 
            setScreen={setScreen}
            setCourierStatus={setCourierStatus}
            navigateToLogin={handleLogout}
        />
    )}

    {/* Cancellation Confirmation */}
    {screen === "cancelConfirm" && (
        <CancelConfirm 
            setScreen={setScreen}
        />
    )}
    </>
  );
}

export default App;