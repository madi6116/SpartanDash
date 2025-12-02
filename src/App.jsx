import React, { useState } from "react";
import Login from "./components/Login";
import HomePage from "./components/Homepage";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Profile from "./components/Profile"; 
import PastOrders from "./components/PastOrders"; 
import MenuPage from "./components/Menupage";

// ADD INITIAL_USERS outside the App function
const INITIAL_USERS = {
    'test@sjsu.edu': 'password123',
};

const INITIAL_FAVORITES = [1009, 1007, 1004, 1001];

function App() {
  const [currentUserEmail, setCurrentUserEmail] = useState('test@sjsu.edu');
  const [screen, setScreen] = useState("login");
  const [cart, setCart] = useState([]);  
  const [favoriteOrders, setFavoriteOrders] = useState(INITIAL_FAVORITES);
  const [registeredUsers, setRegisteredUsers] = useState(INITIAL_USERS);
  const [orderViewMode, setOrderViewMode] = useState('all');
  const [returnScreen, setReturnScreen] = useState('home');
  
  // Track which restaurant is currently selected
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const handleLogout = () => {
    setCart([]);
    setScreen("login");
  };

  const navigateToPayment = (returnScreen) => {
    setScreen("payment");
  };

  return (
    <>
      {screen === "login" && (
        <Login 
          setScreen={setScreen}
          registeredUsers={registeredUsers} // PASS THE CURRENT USER LIST
          setRegisteredUsers={setRegisteredUsers} // PASS THE SETTER FUNCTION
        />
      )}
      {screen === "home" && <HomePage setScreen={setScreen} cart={cart} setSelectedRestaurantId={setSelectedRestaurantId}/>}
      {screen === "cart" && <Cart setScreen={setScreen} cart={cart} setCart={setCart} />}
      {screen === "payment" && (
        <Payment 
          setScreen={setScreen} 
          cart={cart}
          returnScreen={returnScreen} />)}
      
      {screen === "profile" && (
        <Profile 
          setScreen={setScreen} 
          handleLogout={handleLogout}
          navigateToHome={() => setScreen("home")}
          setCart={setCart}
          // PASS NEW PROPS
          favoriteOrders={favoriteOrders}
          setFavoriteOrders={setFavoriteOrders}
          setOrderViewMode={setOrderViewMode}
          currentUserEmail={currentUserEmail}
        />
      )}
      
      {screen === "pastOrders" && (
        <PastOrders
          navigateToProfile={() => setScreen("profile")}
          setScreen={setScreen}
          setCart={setCart}
          // PASS NEW PROPS
          favoriteOrders={favoriteOrders}
          setFavoriteOrders={setFavoriteOrders}
          orderViewMode={orderViewMode}
        />
      )}
      {screen === "menu" && (
        <MenuPage 
        setScreen={setScreen}
        restaurantId ={selectedRestaurantId}
        setCart = {setCart} 
        />
      )}
    </> 
  );
}

export default App;