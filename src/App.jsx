import React, { useState } from "react";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import Payment from "./components/Payment";
import Profile from "./components/Profile"; 

function App() {
  const [screen, setScreen] = useState("login");
  const [cart, setCart] = useState([]);  

  const handleLogout = () => {
    setCart([]);
    setScreen("login");
  };

  return (
    <>
      {screen === "login" && <Login setScreen={setScreen} />}
      {screen === "home" && <HomePage setScreen={setScreen} cart={cart} />}
      {screen === "cart" && <Cart setScreen={setScreen} cart={cart} setCart={setCart} />}
      {screen === "payment" && <Payment setScreen={setScreen} cart={cart} />}
      
      {screen === "profile" && (
        <Profile 
          setScreen={setScreen} 
          handleLogout={handleLogout} 
        />
      )}
    </>
  );
}

export default App;